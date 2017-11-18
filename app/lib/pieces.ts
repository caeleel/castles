import 'isomorphic-fetch'

module Pieces {
  const cellLen: number = 2;
  const cellArea: number = cellLen * cellLen;

  interface RoomInstance {
    all_modifier?: number;
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
    touches_modifier?: number;
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

  interface overlapsFunction {
    (p: Piece): boolean;
  }

  interface moveFunction {
    (x: number, y: number): void;
  }

  export interface PieceMap {
    [id: number]: Pieces.Piece;
  }

  export interface LoadedPieceData {
    id?: number;
    x?: number;
    y?: number;
    rotateNumTimes?: number;
    valid: boolean;
  }

  export class Piece {
    public x?: number;
    public y?: number;
    private subrect?: Piece;
    private radius?: number;
    public orientation?: number[];

    // Returns positive number if pieces overlap, 0 if they do not.
    public overlap: overlapFunction = (p) => {
      let xOverlap: number = Math.min((this.x + this.width - p.x), (p.x + p.width - this.x), this.width, p.width);
      let yOverlap: number = Math.min((this.y + this.height - p.y), (p.y + p.height - this.y), this.height, p.height);

      if (xOverlap <= 0 || yOverlap <= 0) return 0;
      if (this.type === 'circle' && p.type === 'circle') {
        let dx:number = Math.abs(p.x + p.radius - this.x - this.radius);
        let dy:number = Math.abs(p.y + p.radius - this.y - this.radius);
        let d:number = Math.sqrt(dx*dx + dy*dy);
        return Math.max(this.radius + p.radius - d, 0);
      }

      let overlap: number = xOverlap * yOverlap;

      if ((this.type === 'octagon' || this.sqft === 500) &&
          (p.type === 'octagon' || p.sqft === 500)) {
        overlap -= cellArea;
      }
      if (this.subrect != null) overlap -= this.subrect.overlap(p);
      if (p.subrect != null) overlap -= p.subrect.overlap(this);

      if (this.subrect != null && p.subrect != null &&
          this.subrect.x === p.subrect.x &&
          this.subrect.y === p.subrect.y) {
        overlap -= cellArea;
      }

      return overlap;
    };

    public fenceTouches: overlapsFunction = (p) => {
      if (this.rType != 'outdoor') return false;
      return this.touchesSide(p, this.orientation);
    }

    public touches: overlapsFunction = (p) => {
      return this.touchesSide(p, [1, 0]) ||
             this.touchesSide(p, [0, 1]) ||
             this.touchesSide(p, [-1, 0]) ||
             this.touchesSide(p, [0, -1]);
    }

    public touchesSide = (p: Piece, orientation: number[]) => {
      let tester = new Piece(0, 0, 0, 0, 0, 0, 0, [], [], 'rectangle', null, 'tester');
      if (this.type === 'rectangle') {
        tester.x = this.x + (orientation[1] == 1? this.width : cellLen*orientation[1]);
        tester.y = this.y + (orientation[0] == -1? this.height : -cellLen*orientation[0]);
        tester.width = orientation[1] == 0? this.width : cellLen;
        tester.height = orientation[0] == 0? this.height : cellLen;
      } else if (this.type == 'octagon') {
        tester.x = this.x + (orientation[1] == 1? this.width : (orientation[1]*2 + 1)*cellLen);
        tester.y = this.y + (orientation[0] == -1? this.height : (-orientation[0]*2 + 1)*cellLen);
        tester.width = orientation[1] == 0? this.width - 2*cellLen : cellLen;
        tester.height = orientation[0] == 0? this.height - 2*cellLen : cellLen;
      } else if (this.type == 'circle') {
        tester.width = cellLen;
        tester.height = cellLen;
        tester.x = this.x + orientation[1]*cellLen*(p.type === 'rectangle'? 3 : 4) + cellLen*2;
        tester.y = this.y - orientation[0]*cellLen*(p.type === 'rectangle'? 3 : 4)  + cellLen*2;

        return tester.overlap(p) > 0;
      }

      let overlap: number = tester.overlap(p);
      if (p.type === 'octagon' || p.type === 'circle') overlap -= cellArea;
      if (p.sqft === 500) overlap -= cellArea;
      if (overlap > 0) return true;
      if (p.type !== 'octagon' || this.type !== 'octagon') return false;

      tester.x = this.x + (this.orientation[1] == 1? this.width - cellLen : 0);
      tester.y = this.y + (this.orientation[0] == -1? this.height - cellLen : 0);
      tester.width = this.orientation[1] == 0? this.width : cellLen;
      tester.height = this.orientation[0] == 0? this.height : cellLen;

      return tester.overlap(p) > 0;
    }

    public overlaps: overlapsFunction = (p) => {
      let overlap: number = this.overlap(p);
      if (overlap > 0) return true;

      let xOverlap: number = Math.min((this.x + this.width - p.x), (p.x + p.width - this.x));
      let yOverlap: number = Math.min((this.y + this.height - p.y), (p.y + p.height - this.y));
      if (xOverlap < 0 || yOverlap < 0) return false;

      return this.fenceTouches(p) || p.fenceTouches(this);
    }

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
          this.subrect.moveTo(x + 2*cellLen, y);
        }
      } else {
        this.moveRelative(x - this.x, y - this.y);
      }
    }

    public rotate = () => {
      this.moveRelative((this.width - this.height) / 2, (this.height - this.width) / 2);

      if (this.subrect != null) {
        let xLocal = this.subrect.x - this.x;
        let yLocal = this.subrect.y - this.y;

        this.subrect.moveRelative(2*cellLen - yLocal - xLocal, xLocal - yLocal);
      }

      this.orientation = [-this.orientation[1], this.orientation[0]];

      this.exits.forEach((exit: number[]) => {
        let newX: number = this.height - exit[1];
        exit[1] = exit[0];
        exit[0] = newX;
      });

      let newHeight: number = this.width;
      this.width = this.height;
      this.height = newHeight;
    }

    public copy = () => {
      let newPiece: Piece = new Piece(
        this.width,
        this.height,
        this.sqft,
        this.points,
        this.modifier,
        this.touches_modifier,
        this.all_modifier,
        this.combo,
        this.exits,
        this.type,
        this.rType,
        this.name,
      );
      newPiece.x = this.x;
      newPiece.y = this.y;
      newPiece.subrect = this.subrect;
      newPiece.orientation = this.orientation;
      return newPiece;
    }

    constructor(
      public width: number,
      public height: number,
      public sqft: number,
      public points: number,
      public modifier: number,
      public touches_modifier: number,
      public all_modifier: number,
      public combo: string[],
      public exits: number[][],
      public type: string,
      public rType: string,
      public name: string
    ) {
      this.orientation = [1, 0];
      if (this.type === 'circle') {
        this.radius = width / 2;
      } else if (this.type === 'L') {
        this.subrect = new Piece(
          this.width / 2,
          this.height / 2,
          this.sqft / 4,
          0,
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

    public toString = () => {
      let rotateNumTimes = 0;
      if (this.orientation[0] == 0 && this.orientation[1] == 1) {
        rotateNumTimes = 1;
      } else if (this.orientation[0] == -1 && this.orientation[1] == 0) {
        rotateNumTimes = 2;
      } else if (this.orientation[0] == 0 && this.orientation[1] == -1) {
        rotateNumTimes = 3;
      }
      return this.x + "," + this.y + ":" + rotateNumTimes;
    }

  }

  export function toLoadedPieceData(piece: string) : LoadedPieceData {
    let parts = piece.split(":");
    console.log(parts);
    if (parts.length !== 3) {
      return {valid: false};
    }
    let id = parts[0];
    let coordinates = parts[1].split(",");
    if (coordinates.length !== 2) {
      return {valid: false};
    }
    let rotateNumTimes = +parts[2];

    let loadedPieceData: LoadedPieceData = {
      id: +id,
      x: +coordinates[0],
      y: +coordinates[1],
      rotateNumTimes: rotateNumTimes,
      valid: true,
    }
    return loadedPieceData;
  }

  export function loadPieces() {
    return fetch('pieces.json')
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
                  room.touches_modifier || 0,
                  instance.all_modifier || room.all_modifier || 0,
                  instance.combo? instance.combo.slice(0) : [],
                  instance.exits? instance.exits.slice(0) : [],
                  roomSize.type,
                  roomType,
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

export default Pieces;
