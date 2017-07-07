import * as actions from '../actions/actions';
import Pieces from '../../../lib/pieces';

export interface BoardState {
  score: number;
  pieces: Pieces.PiecePlacement[];
  selectedPieceName: string;
}

export const DEFAULT_BOARD_STATE: BoardState = {
  score: 0,
  pieces: [{name: "test", x: 1, y: 1, rotation: 0}],
  selectedPieceName: "test"
};

export function boardReducer(state: BoardState = DEFAULT_BOARD_STATE, action: actions.Action<any>): BoardState {
  if (actions.board.setSelectedPieceName.matches(action)) {
    return {
      ...state,
      selectedPieceName: action.payload.name,
    };
  } else if (actions.board.movePiece.matches(action)) {
    return {
      ...state,
      pieces: state.pieces.map((piece: Pieces.PiecePlacement) => {
        if (piece.name == action.payload.name) {
          return {...piece, x: action.payload.x, y: action.payload.y};
        } else {
          return piece;
        }
      })
    };
  } else if (actions.board.addPiece.matches(action)) {
    return {
      ...state,
      pieces: [...state.pieces, {name: action.payload.name, x: 0, y: 0, rotation: 0}]
    };
  } else if (actions.board.deletePiece.matches(action)) {
    return {
      ...state,
      pieces: state.pieces.filter((piece: Pieces.PiecePlacement) => {
        return piece.name != action.payload.name;
      })
    };
  } else if (actions.board.rotatePiece.matches(action)) {
    return {
      ...state,
      pieces: state.pieces.map((piece: Pieces.PiecePlacement) => {
        if (piece.name == action.payload.name) {
          return {...piece, rotation: piece.rotation + action.payload.increment};
        } else {
          return piece;
        }
      })
    };
  } else {
    return state;
  }
}
