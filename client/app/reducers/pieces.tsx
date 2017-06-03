import * as actions from '../actions/actions';
import Pieces from '../../../lib/pieces';

export class Piece {
  public readonly id: string;
}

export interface PiecesState {
  pieces: Array<Pieces.Piece>;
  selectedId: string;
}

export const DEFAULT_PIECES_STATE: PiecesState = {
  pieces: [] as Array<Pieces.Piece>,
  selectedId: "",
};

export interface Action<T> {
  readonly type: T;
}

type actionType = actions.SetSelectedIdActionType | actions.MoveSelectedIdActionType | actions.SetPiecesType;

export function piecesReducer(
  state: PiecesState = DEFAULT_PIECES_STATE,
  action: actionType): PiecesState {
  switch (action.type) {
    case "SET_SELECTED_ID":
      return {
        pieces: state.pieces,
        selectedId: "something",
      };
    case "MOVE_SELECTED_ID":
      return state;
    // case "SET_PIECES":
    //   return {
    //     pieces: (<actions.SetPiecesType>action).pieces,
    //     selectedId: "",
    //   }
    default:
      return state;
  }
}


