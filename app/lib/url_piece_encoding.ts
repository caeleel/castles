import Pieces from "./pieces";

export interface LoadedPieceData {
  id?: number;
  rotateNumTimes?: number;
  x?: number;
  y?: number;
  valid: boolean;
}

export namespace UrlPieceEncoding {

  const ACharCode = 65;
  const aCharCode = 97;

  export function encodePieces(pieces: Pieces.Piece[], pieceIds: number[]) {
    const encoded: string[] = [];
    for (const id of pieceIds) {
      encoded.push(toString(id, pieces[id]));
    }
    return encoded.join("&");
  }

  function toString(id: number, piece: Pieces.Piece) {
    let rotateNumTimes = 0;
    if (piece.orientation[0] === 0 && piece.orientation[1] === 1) {
      rotateNumTimes = 1;
    } else if (piece.orientation[0] === -1 && piece.orientation[1] === 0) {
      rotateNumTimes = 2;
    } else if (piece.orientation[0] === 0 && piece.orientation[1] === -1) {
      rotateNumTimes = 3;
    }
    return encodeId(id) + rotateNumTimes + piece.x + "," + piece.y;
  }

  function encodeId(id: number) {
    if (id >= 0 && id < 26) {
      return "+" + String.fromCharCode(id + ACharCode);
    } else if (id >= 26 && id < 52) {
      return "+" + String.fromCharCode(id + aCharCode - 26);
    } else if (id >= 52 && id < 78) {
      return "-" + String.fromCharCode(id + ACharCode - 52);
    } else {
      return "-" + String.fromCharCode(id + aCharCode - 78);
    }
  }

  function decodeId(encoded: string) {
    let id = encoded.charCodeAt(1);
    if (id >= aCharCode) {
      id += 26 - aCharCode;
    } else {
      id -= ACharCode;
    }
    if (encoded.charAt(0) === "-") {
      id += 52;
    }
    return id;
  }

  export function toLoadedPieceData(hash: string): LoadedPieceData {
    const id = decodeId(hash.substring(0, 2));

    const rotateNumTimes = +hash.charAt(2);

    const coordinates = hash.substring(3).split(",");
    if (coordinates.length !== 2) {
      return {valid: false};
    }

    const loadedPieceData: LoadedPieceData = {
      id: +id,
      rotateNumTimes,
      x: +coordinates[0],
      y: +coordinates[1],
      valid: true,
    };
    return loadedPieceData;
  }
}
