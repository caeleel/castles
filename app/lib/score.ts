import Pieces from "./pieces";

export namespace Score {
  export function getScorablePieceMap(pieces: Pieces.Piece[], pieceIds: number[]) {
    const scorablePieceMap: Pieces.PieceMap = {15: pieces[15]};
    const pieceIdsToTest = [15];

    while (pieceIdsToTest.length > 0) {
      const neighbors = getNeighbors(pieceIdsToTest.pop(), pieceIds, pieces);
      for (const id in neighbors) {
        if (!scorablePieceMap[id] && !overlapsAnotherPieceInMap(pieces[id], scorablePieceMap)) {
          scorablePieceMap[id] = pieces[id];
          pieceIdsToTest.push(+id);
        }
      }
    }
    return scorablePieceMap;
  }

  function overlapsAnotherPieceInMap(piece: Pieces.Piece, piecesToTest: Pieces.PieceMap) {
    for (const id in piecesToTest) {
      if (piece.overlaps(piecesToTest[id])) {
        return true;
      }
    }
    return false;
  }

  export interface PieceScores {
    [index: number]: number;
    sum: number;
  }

  export function score(pieces: Pieces.Piece[], pieceIds: number[]) {
    const pieceScores: PieceScores = {sum: 0};
    pieceIds.map((id: number) => {
      const score = scorePiece(id, pieceIds, pieces);
      pieceScores[id] = score;
      pieceScores.sum += score;
    });
    return pieceScores;
  }

  function scorePiece(id: number, pieceIds: number[], pieces: Pieces.Piece[]) {
    const piece = pieces[id];
    let score = piece.points;
    const exitMap = {};
    const neighbors = getNeighbors(id, pieceIds, pieces, exitMap);
    score += scoreCombos(piece, neighbors);
    score += scoreTouchesCombos(piece, pieceIds, pieces);
    score += scoreGlobalCombos(piece, pieceIds, pieces);

    if (piece.rType == "living" && Object.keys(neighbors).length == piece.exits.length) {
      score *= 2;
    }
    if (piece.rType == "activity" && Object.keys(exitMap).length == piece.exits.length) {
      score += 5;
    }
    return score;
  }

  function getNeighbors(id: number, pieceIds: number[], pieces: Pieces.Piece[], exitMap?: { [idx: number]: boolean }) {
    const piece = pieces[id];
    const neighbors: Pieces.PieceMap = {};
    for (const potentialNeighborId of pieceIds) {
      const potentialNeighbor = pieces[potentialNeighborId];
      if (id != potentialNeighborId) {
        for (const potentialNeighborExit of pieces[potentialNeighborId].exits) {
          for (const idx in piece.exits) {
            const exit = piece.exits[idx];
            if (piece.x + exit[0] == potentialNeighbor.x + potentialNeighborExit[0] &&
                piece.y + exit[1] == potentialNeighbor.y + potentialNeighborExit[1]) {
              neighbors[potentialNeighborId] = pieces[potentialNeighborId];
              if (exitMap) { exitMap[idx] = true; }
            }
          }
        }
      }
    }
    return neighbors;
  }

  function scoreCombos(piece: Pieces.Piece, neighbors: Pieces.PieceMap) {
    let score = 0;
    if (piece.modifier == 0) { return score; }
    for (const id in neighbors) {
      for (const c of piece.combo) {
        if (neighbors[id].rType == c) {
          score += piece.modifier;
        }
      }
    }
    return score;
  }

  function scoreTouchesCombos(piece: Pieces.Piece, pieceIds: number[], pieces: Pieces.Piece[]) {
    let score = 0;
    if (piece.touches_modifier == 0) { return score; }
    for (const id of pieceIds) {
      if (piece.touches(pieces[id])) {
        for (const c of piece.combo) {
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
    for (const id of pieceIds) {
      for (const c of piece.combo) {
        if (pieces[id].rType == c) {
          score += piece.all_modifier;
        }
      }
    }
    return score;
  }
}
