import * as actions from '../actions/actions';
import Pieces from '../../../lib/pieces';

export interface BoardState {
  score: number;
  pieces: Pieces.PiecePlacement[];
  selectedPieceId: number;
}

export const DEFAULT_BOARD_STATE: BoardState = {
  score: 0,
  pieces: [{name: "test", x: 1, y: 1, rotation: 0}],
  selectedPieceId: 0
};

export function boardReducer(state: BoardState = DEFAULT_BOARD_STATE, action: actions.Action<any>): BoardState {
  if (actions.board.addPiece.matches(action)) {
    return {
      ...state,
      pieces: [...state.pieces, {
        name: action.payload.name,
        x: state.pieces.length, // set x coord to length to stagger multiple incoming pieces
        y: state.pieces.length, // set y coord to length to stagger multiple incoming pieces
        rotation: 0
      }]
    };
  } else if (actions.board.movePiece.matches(action)) {
    return {
      ...state,
      pieces: state.pieces.map((piece: Pieces.PiecePlacement, index: number) => {
        if (index == action.payload.id) {
          return {...piece, x: action.payload.x, y: action.payload.y};
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
      pieces: state.pieces.filter((piece: Pieces.PiecePlacement, index: number) => {
        return index != action.payload.id;
      })
    };
  } else if (actions.board.rotatePiece.matches(action)) {
    return {
      ...state,
      pieces: state.pieces.map((piece: Pieces.PiecePlacement, index: number) => {
        if (index == action.payload.id) {
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
