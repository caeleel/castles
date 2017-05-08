import 'isomorphic-fetch'

export module Pieces {
  const octagonal: string[] = ['circle', 'octagon'];
  const rectangular: string[] = ['rectangle', 'L'];
  const cellArea: number = 4;

  interface RoomInstance {
    combo?: string[];
    exits?: number[][];
    fence?: boolean;
    number?: number;
  }

  interface RoomInstances {
    [name:string]: RoomInstance;
  }

  interface Room {
    points?: number;
    modifier?: number;
    all_modifier?: number;
    instances: RoomInstances;
  }

  interface RoomType {
    [roomType: string]: Room;
  }

  interface RoomSize {
    type: string;
    dimensions: number[];
    rooms: RoomType;
  }

  interface PieceFile {
    [sqft: string]: RoomSize;
  }

  interface overlapFunction {
    (p: Piece): number;
  }

  interface moveFunction {
    (x: number, y: number): void;
  }

  export class Piece {
    public x?: number;
    public y?: number;
    private subrect?: Piece;
    private radius?: number;

    // Returns positive number if pieces overlap, 0 if they do not.
    public overlap: overlapFunction = (p) => {
      let xOverlap: number = Math.min((this.x + this.width - p.x), (p.x + p.width - this.x));
      let yOverlap: number = Math.min((this.y + this.height - p.y), (p.y + p.height - this.y));

      if (xOverlap <= 0 || yOverlap <= 0) return 0;
      if (this.type === 'circle' && p.type === 'circle') {
        let dx:number = Math.abs(p.x + p.radius - this.x - this.radius);
        let dy:number = Math.abs(p.y + p.radius - this.y - this.radius);
        let d:number = Math.sqrt(dx*dx + dy*dy);
        return Math.max(this.radius + p.radius - d, 0);
      }

      let overlap: number = xOverlap * yOverlap;

      if (octagonal.indexOf(this.type) >= 0 && octagonal.indexOf(p.type)) {
        overlap -= cellArea;
      }
      if (this.subrect) {
        overlap -= this.subrect.overlap(p);
      }

      return overlap;
    };

    public moveRelative: moveFunction = (x, y) => {
      this.x += x;
      this.y += y;
      if (this.subrect) {
        this.subrect.moveRelative(x, y);
      }
    }

    public moveTo: moveFunction = (x, y) => {
      if (this.x == null) {
        this.x = x;
        this.y = y;
        if (this.subrect) {
          this.subrect.moveTo(x + 4, y);
        }
      } else {
        this.moveRelative(x - this.x, y - this.y);
      }
    }

    public rotate = () => {
      if (this.subrect != null) {
        let xLocal = this.subrect.x - this.x;
        let yLocal = this.subrect.y - this.y;

        this.subrect.moveRelative(yLocal - xLocal, 4 - xLocal - yLocal);
      }

      if (this.fence != null) {
        this.fence = [-this.fence[1], this.fence[0]];
      }

      this.exits.forEach((exit: number[]) => {
        let newY: number = this.width - exit[0];
        exit[0] = exit[1];
        exit[1] = newY;
      });

      let newHeight: number = this.width;
      this.width = this.height;
      this.height = newHeight;
    }

    constructor(
      public width: number,
      public height: number,
      public sqft: number,
      public points: number,
      public modifier: number,
      public all_modifier: number,
      public combo: string[],
      public exits: number[][],
      public type: string,
      public fence: number[],
      public name: string
    ) {
      if (this.type === 'circle') {
        this.radius = width / 2;
      } else if (this.type === 'L') {
        this.subrect = new Piece(
          this.height / 2,
          this.width / 2,
          this.sqft / 4,
          0,
          0,
          0,
          [],
          [],
          'rectangle',
          null,
          'subtract'
        );
      }
      this.moveTo(0, 0);
    }
  }

  export function loadPieces() {
    return fetch('http://localhost:1337/static/pieces.json')
      .then(resp => {
        return resp.json();
      }).then((pieces: PieceFile) => {
        let rooms: Piece[] = [];

        Object.keys(pieces).forEach((sqft: string) => {
          let roomSize: RoomSize = pieces[sqft];
          Object.keys(roomSize.rooms).forEach((roomType: string) => {
            let room: Room = roomSize.rooms[roomType];
            Object.keys(room.instances).forEach((name: string) => {
              let instance: RoomInstance = room.instances[name];
              let n = instance.number || 1;
              for (let i=0; i<n; i++) {
                if (instance.exits) {
                  for (let j=0; j<instance.exits.length; j++) {
                    instance.exits[j] = instance.exits[j].slice(0);
                  }
                }
                rooms.push(new Piece(
                  roomSize.dimensions[0],
                  roomSize.dimensions[1],
                  sqft === '150-H' ? 150 : Number(sqft),
                  room.points || 0,
                  room.modifier || 0,
                  room.all_modifier || 0,
                  instance.combo? instance.combo.slice(0) : [],
                  instance.exits? instance.exits.slice(0) : [],
                  roomSize.type,
                  instance.fence? [0, 1] : null,
                  name
                ));
              }
            });
          });
        });

        return rooms;
      });
  }
}
