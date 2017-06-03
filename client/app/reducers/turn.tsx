import * as actions from '../actions/actions';

export class Turn {
  public readonly id: string;
}

export interface TurnsMap {
  [turnId: string]: Turn;
}

export interface TurnsState {
  turns: TurnsMap;
}

export const DEFAULT_PIECES_STATE: TurnsState = {
  turns: {} as TurnsMap,
};

export interface Action<T> {
  readonly type: T;
}

type actionType = actions.SetSelectedIdActionType | actions.MoveSelectedIdActionType;

export function turnsReducer(
  state: TurnsState = DEFAULT_PIECES_STATE,
  action: actionType): TurnsState {
  switch (action.type) {
    case "SET_SELECTED_ID":
      return state;
    default:
      return state;
  }
}
