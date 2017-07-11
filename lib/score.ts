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
    score += scoreTouchesCombos(piece, pieceIds, pieces);
    score += scoreGlobalCombos(piece, pieceIds, pieces);

    if (piece.rType == "living" && neighbors.length == piece.exits.length) {
      score *= 2;
    }
    if (piece.rType == "activity" && neighbors.length == piece.exits.length) {
      score += 5;
    }
    return score;
  }

  function getNeighbors(id: number, pieceIds: number[], pieces: Pieces.Piece[]) {
    let piece = pieces[id]
    let neighbors: Pieces.Piece[] = [];
    for (let potentialNeighborId of pieceIds) {
      let potentialNeighbor = pieces[potentialNeighborId];
      if (id != potentialNeighborId) {
        for (let potentialNeighborExit of pieces[potentialNeighborId].exits) {
          for (let exit of piece.exits) {
            if (piece.x + exit[0] == potentialNeighbor.x + potentialNeighborExit[0] &&
                piece.y + exit[1] == potentialNeighbor.y + potentialNeighborExit[1]) {
              neighbors.push(pieces[potentialNeighborId]);
            }
          }
        }
      }
    }
    return neighbors;
  }

  function scoreCombos(piece: Pieces.Piece, neighbors: Pieces.Piece[]) {
    let score = 0;
    if (piece.modifier == 0) { return score; }
    for (let neighbor of neighbors) {
      for (let c of piece.combo) {
        if (neighbor.rType == c) {
          score += piece.modifier;
        }
      }
    }
    return score;
  }

  function scoreTouchesCombos(piece: Pieces.Piece, pieceIds: number[], pieces: Pieces.Piece[]) {
    let score = 0;
    if (piece.touches_modifier == 0) { return score; }
    for (let id of pieceIds) {
      if (piece.touches(pieces[id])) {
        for (let c of piece.combo) {
          if (pieces[id].rType == c) {
            score += piece.touches_modifier;
          }
        }
      }
    }
    return score;
  }

  function scoreGlobalCombos(piece: Pieces.Piece, pieceIds: number[], pieces: Pieces.Piece[]) {
    let score = 0;
    if (piece.all_modifier == 0) { return score; }
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
