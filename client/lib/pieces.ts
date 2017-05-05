import 'isomorphic-fetch'

export module Pieces {
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

  export class Piece {
    public x?: number;
    public y?: number;

    constructor(
      public height: number,
      public width: number,
      public sqft: number,
      public points: number,
      public modifier: number,
      public all_modifier: number,
      public combo: string[],
      public exits: number[][],
      public type: string,
      public fence: boolean,
      public name: string
    ) {
    }
  }

  export function loadPieces() {
    return fetch('http://localhost:1337/dist/pieces.json')
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
                rooms.push(new Piece(
                  roomSize.dimensions[0],
                  roomSize.dimensions[1],
                  sqft === '150-H' ? 150 : Number(sqft),
                  room.points || 0,
                  room.modifier || 0,
                  room.all_modifier || 0,
                  instance.combo || [],
                  instance.exits,
                  roomSize.type,
                  instance.fence || false,
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
