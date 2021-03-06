import piecesJson from "../../pieces";

namespace Pieces {
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
    [name: string]: RoomInstance;
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

  type overlapFunction = (p: Piece) => number;

  type overlapsFunction = (p: Piece) => boolean;

  type moveFunction = (x: number, y: number) => void;

  export interface PieceMap {
    [id: number]: Pieces.Piece;
  }

  export class Piece {
    public x?: number;
    public y?: number;
    private subrect?: Piece;
    private radius?: number;
    public orientation?: number[];

    // Returns positive number if pieces overlap, 0 if they do not.
    public overlap: overlapFunction = (p) => {
      const xOverlap: number = Math.min((this.x + this.width - p.x), (p.x + p.width - this.x), this.width, p.width);
      const yOverlap: number = Math.min((this.y + this.height - p.y), (p.y + p.height - this.y), this.height, p.height);

      if (xOverlap <= 0 || yOverlap <= 0) { return 0; }
      if (this.type === "circle" && p.type === "circle") {
        const dx: number = Math.abs(p.x + p.radius - this.x - this.radius);
        const dy: number = Math.abs(p.y + p.radius - this.y - this.radius);
        const d: number = Math.sqrt(dx * dx + dy * dy);
        return Math.max(this.radius + p.radius - d, 0);
      }

      let overlap: number = xOverlap * yOverlap;

      if ((this.type === "octagon" || this.sqft === 500) &&
          (p.type === "octagon" || p.sqft === 500)) {
        overlap -= cellArea;
      }
      if (this.subrect != null) { overlap -= this.subrect.overlap(p); }
      if (p.subrect != null) { overlap -= p.subrect.overlap(this); }

      if (this.subrect != null && p.subrect != null &&
          this.subrect.x === p.subrect.x &&
          this.subrect.y === p.subrect.y) {
        overlap -= cellArea;
      }

      return overlap;
    }

    public fenceTouches: overlapsFunction = (p) => {
      if (this.rType != "outdoor") { return false; }
      return this.touchesSide(p, this.orientation);
    }

    public touches: overlapsFunction = (p) => {
      return this.touchesSide(p, [1, 0]) ||
             this.touchesSide(p, [0, 1]) ||
             this.touchesSide(p, [-1, 0]) ||
             this.touchesSide(p, [0, -1]);
    }

    /* orientation represents:
     * [1, 0]: touches top side
     * [0, 1]: touches right side
     * [-1, 0]: touches bottom
     * [0, -1]: touches left side
     */
    public touchesSide = (p: Piece, orientation: number[]) => {
      const tester = new Piece(0, 0, 0, 0, 0, 0, 0, [], [], "rectangle", null, "tester");
      if (this.type === "rectangle") {
        tester.x = this.x + (orientation[1] == 1 ? this.width : cellLen * orientation[1]);
        tester.y = this.y + (orientation[0] == -1 ? this.height : -cellLen * orientation[0]);
        tester.width = orientation[1] == 0 ? this.width : cellLen;
        tester.height = orientation[0] == 0 ? this.height : cellLen;
      } else if (this.type == "octagon") {
        tester.x = this.x + (orientation[1] == 1 ? this.width : (orientation[1] * 2 + 1) * cellLen);
        tester.y = this.y + (orientation[0] == -1 ? this.height : (-orientation[0] * 2 + 1) * cellLen);
        tester.width = orientation[1] == 0 ? this.width - 2 * cellLen : cellLen;
        tester.height = orientation[0] == 0 ? this.height - 2 * cellLen : cellLen;
      } else if (this.type == "circle") {
        tester.width = cellLen;
        tester.height = cellLen;
        const baseWidth = (this.width - cellLen)/(2 * cellLen); // 2 for radius 5 circles, 1 for radius 3
        const offset = baseWidth + (p.type === "rectangle" ? 1 : 2);
        tester.x = this.x + orientation[1] * cellLen * offset + cellLen * baseWidth;
        tester.y = this.y - orientation[0] * cellLen * offset  + cellLen * baseWidth;

        return tester.overlap(p) > 0;
      }

      let overlap: number = tester.overlap(p);
      if (p.type === "octagon" || p.type === "circle") { overlap -= cellArea; }
      if (p.sqft === 500) { overlap -= cellArea; }
      if (overlap > 0) { return true; }
      if (p.type !== "octagon" || this.type !== "octagon") { return false; }

      tester.x = this.x + (this.orientation[1] == 1 ? this.width - cellLen : 0);
      tester.y = this.y + (this.orientation[0] == -1 ? this.height - cellLen : 0);
      tester.width = this.orientation[1] == 0 ? this.width : cellLen;
      tester.height = this.orientation[0] == 0 ? this.height : cellLen;

      return tester.overlap(p) > 0;
    }

    public overlaps: overlapsFunction = (p) => {
      const overlap: number = this.overlap(p);
      if (overlap > 0) { return true; }

      const xOverlap: number = Math.min((this.x + this.width - p.x), (p.x + p.width - this.x));
      const yOverlap: number = Math.min((this.y + this.height - p.y), (p.y + p.height - this.y));
      if (xOverlap < 0 || yOverlap < 0) { return false; }

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
          this.subrect.moveTo(x + 2 * cellLen, y);
        }
      } else {
        this.moveRelative(x - this.x, y - this.y);
      }
    }

    public rotate = () => {
      this.moveRelative((this.width - this.height) / 2, (this.height - this.width) / 2);

      if (this.subrect != null) {
        const xLocal = this.subrect.x - this.x;
        const yLocal = this.subrect.y - this.y;

        this.subrect.moveRelative(2 * cellLen - yLocal - xLocal, xLocal - yLocal);
      }

      this.orientation = [-this.orientation[1], this.orientation[0]];

      this.exits.forEach((exit: number[]) => {
        const newX: number = this.height - exit[1];
        exit[1] = exit[0];
        exit[0] = newX;
      });

      const newHeight: number = this.width;
      this.width = this.height;
      this.height = newHeight;
    }

    public copy = () => {
      const newPiece: Piece = new Piece(
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
      public name: string,
    ) {
      this.orientation = [1, 0];
      if (this.type === "circle") {
        this.radius = width / 2;
      } else if (this.type === "L") {
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
          "rectangle",
          null,
          "subtract",
        );
      }
      this.moveTo(0, 0);
    }
  }

  export function loadPieces() {
    let pieces = piecesJson as PieceFile
    const rooms: Piece[] = [];

    Object.keys(pieces).forEach((sqft: string) => {
      const roomSize: RoomSize = pieces[sqft];
      Object.keys(roomSize.rooms).forEach((roomType: string) => {
        const room: Room = roomSize.rooms[roomType];
        Object.keys(room.instances).forEach((name: string) => {
          const instance: RoomInstance = room.instances[name];
          const n = instance.number || 1;
          for (let i = 0; i < n; i++) {
            if (instance.exits) {
              for (let j = 0; j < instance.exits.length; j++) {
                instance.exits[j] = instance.exits[j].slice(0);
              }
            }
            rooms.push(new Piece(
              roomSize.dimensions[0],
              roomSize.dimensions[1],
              sqft === "150-H" ? 150 : Number(sqft),
              room.points || 0,
              room.modifier || 0,
              room.touches_modifier || 0,
              instance.all_modifier || room.all_modifier || 0,
              instance.combo ? instance.combo.slice(0) : [],
              instance.exits ? instance.exits.slice(0) : [],
              roomSize.type,
              roomType,
              name,
            ));
          }
        });
      });
    });

    return rooms;
  }
}

export default Pieces;
