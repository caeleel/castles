import * as actions from '../actions/actions';
import Pieces from '../../../lib/pieces';

export interface PiecesState {
  pieces: Array<Pieces.Piece>;
  selectedId: string;
}

export const DEFAULT_PIECES_STATE: PiecesState = {
  pieces: [] as Array<Pieces.Piece>,
  selectedId: "",
};

export function piecesReducer(state: PiecesState = DEFAULT_PIECES_STATE, action: actions.Action<any>): PiecesState {
  if (actions.piece.setSelectedId.matches(action)) {
    return {
      pieces: state.pieces,
      selectedId: action.payload.id,
    }
  } else if (actions.piece.moveSelectedId.matches(action)) {
    return state;
  } else if (actions.piece.setPieces.matches(action)) {
    return {
      pieces: action.payload.pieces,
      selectedId: "",
    }
  } else {
    return state;
  }
}
