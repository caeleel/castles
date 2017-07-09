import Pieces from './pieces';

export module Score {

  interface exitMap {
    [coordinate: string]: string[]
  }

  export function score(pieces: Pieces.PiecePlacement[], pieceMap: Pieces.PieceMap) {
    let sum = 0;

    pieces.map((piece: Pieces.PiecePlacement) => {
      // let neighbors = getNeighbors(piece, pieces, pieceMap);
      let neighbors: Pieces.Piece[];
      sum += scorePiece(piece, pieceMap, neighbors);

    })
    return sum;
  }

  function scorePiece(piece: Pieces.PiecePlacement, pieceMap: Pieces.PieceMap, neighbors: Pieces.Piece[]) {
    return pieceMap[piece.name].points;
  }

  // function getNeighbors(piece: Pieces.PiecePlacement, pieces: Pieces.PiecePlacement[], pieceMap: Pieces.PieceMap) {


  //   pieces.map((potentialNeighbor: Pieces.PiecePlacement) => {
  //     pieceMap[potentialNeighbor.name].exits.map((exit: number[]) => {
  //     if (potentialNeighbor)
  //       pieceMap[piece.name].exits.map((exit: number[]) => {
  //   let neighbors: Pieces.Piece[] = [];
  //   pieceMap[piece.name].exits.map((exit: number[]) => {
  //     exitMap[exit[0] + "," + exit[1]].map((neighborName: string) => {
  //       if (neighborName != piece.name) {
  //         neighbors.push(pieceMap[neighborName]);
  //       }
  //     });
  //   });

  //   return neighbors;
  // }
}
