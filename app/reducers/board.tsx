import * as actions from '../actions/actions';
import Pieces from '../lib/pieces';

export interface BoardState {
  pieces: Pieces.Piece[];
  pieceIds: number[];
  selectedPieceId: number;
}

export const DEFAULT_BOARD_STATE: BoardState = {
  pieceIds: [],
  pieces: [],
  selectedPieceId: 0
};

export function boardReducer(state: BoardState = DEFAULT_BOARD_STATE, action: actions.Action<any>): BoardState {
  if (actions.board.addPiece.matches(action)) {
    // newPiece.x = 10 + state.pieceIds.length; // set x coord to length to stagger multiple incoming pieces
    // newPiece.y = state.pieceIds.length; // set y coord to length to stagger multiple incoming pieces
    return {
      ...state,
      pieceIds: [...state.pieceIds, action.payload.id]
    };
  } else if (actions.board.movePiece.matches(action)) {
    return {
      ...state,
      pieces: state.pieces.map((piece: Pieces.Piece, index: number) => {
        if (index == action.payload.id) {
          piece = piece.copy();
          piece.moveTo(action.payload.x, action.payload.y);
          return piece;
        } else {
          return piece;
        }
      })
    };
  } else if (actions.board.setSelectedPieceId.matches(action)) {
    return {
      ...state,
      selectedPieceId: action.payload.id,
    };
  } else if (actions.board.deletePiece.matches(action)) {
    return {
      ...state,
      pieceIds: state.pieceIds.filter((index: number) => {
        return index != action.payload.id;
      })
    };
  } else if (actions.board.rotatePiece.matches(action)) {
    return {
      ...state,
      pieces: state.pieces.map((piece: Pieces.Piece, index: number) => {
        if (index == action.payload.id) {
          piece = piece.copy();
          piece.rotate();
          return piece;
        } else {
          return piece;
        }
      })
    };
  } else if (actions.piece.setPieces.matches(action)) {
    return {
      ...state,
      pieces: action.payload.pieces,
    }
  } else {
    return state;
  }
}
