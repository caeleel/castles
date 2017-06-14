import * as actions from '../actions/actions';
import Pieces from '../../../lib/pieces';

export interface PiecesState {
  pieceMap: Pieces.PieceMap;
}

export const DEFAULT_PIECES_STATE: PiecesState = {
  pieceMap: {} as Pieces.PieceMap,
};

export function piecesReducer(state: PiecesState = DEFAULT_PIECES_STATE, action: actions.Action<any>): PiecesState {
  if (actions.piece.setPieces.matches(action)) {
    return {
      pieceMap: action.payload.pieceMap,
    }
  } else {
    return state;
  }
}
