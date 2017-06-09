import * as actions from '../actions/actions';
import Pieces from '../../../lib/pieces';

export interface PiecesState {
  pieceMap: Pieces.PieceMap;
  selectedId: string;
}

export const DEFAULT_PIECES_STATE: PiecesState = {
  pieceMap: {} as Pieces.PieceMap,
  selectedId: "",
};

export function piecesReducer(state: PiecesState = DEFAULT_PIECES_STATE, action: actions.Action<any>): PiecesState {
  if (actions.piece.setSelectedId.matches(action)) {
    return {
      pieceMap: state.pieceMap,
      selectedId: action.payload.id,
    }
  } else if (actions.piece.moveSelectedId.matches(action)) {
    return state;
  } else if (actions.piece.setPieces.matches(action)) {
    return {
      pieceMap: action.payload.pieceMap,
      selectedId: "",
    }
  } else {
    return state;
  }
}
