import Pieces from './pieces';

export module Score {

  export function score(pieces: Pieces.Piece[], pieceIds: number[]) {
    let sum = 0;
    pieceIds.map((id: number) => {
      sum += scorePiece(id, pieceIds, pieces);
    })
    return sum;
  }

  function scorePiece(id: number, pieceIds: number[], pieces: Pieces.Piece[]) {
    let piece = pieces[id];
    let score = piece.points;
    let neighbors = getNeighbors(id, pieceIds, pieces)
    score += scoreCombos(piece, neighbors);
    if (piece.rType == "downstairs") {
      score += scoreGlobalCombos(piece, pieceIds, pieces);
    }

    if (piece.rType == "living" && neighbors.length == piece.exits.length) {
      score *= 2;
    }
    return score;
  }

  function getNeighbors(id: number, pieceIds: number[], pieces: Pieces.Piece[]) {
    let piece = pieces[id]
    let neighbors: Pieces.Piece[] = [];
    for (let potentialNeighborId of pieceIds) {
      if (id != potentialNeighborId) {
        for (let potentialNeighborExit of pieces[potentialNeighborId].exits) {
          for (let exit of piece.exits) {
            if (exit[0] == potentialNeighborExit[0] && exit[1] == potentialNeighborExit[1]) {
              neighbors.push(pieces[id]);
            }
          }
        }
      }
    }
    console.log(neighbors)
    return neighbors;
  }

  function scoreCombos(piece: Pieces.Piece, neighbors: Pieces.Piece[]) {
    let score = 0;
    for (let neighbor of neighbors) {
      for (let c of piece.combo) {
        if (neighbor.rType == c) {
          score += piece.modifier;
        }
      }
    }
    return score;
  }

  function scoreGlobalCombos(piece: Pieces.Piece, pieceIds: number[], pieces: Pieces.Piece[]) {
    let score = 0;
    for (let id of pieceIds) {
      for (let c of piece.combo) {
        if (pieces[id].rType == c) {
          score += piece.all_modifier;
        }
      }
    }
    return score;
  }
}
