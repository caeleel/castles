import * as actions from '../actions/actions';

export interface GameState {
  mode: State;
}

export enum State {
  Pricing,
  Placing,
}

export const DEFAULT_GAME_STATE: GameState = {
  mode: State.Pricing,
};

export function gameReducer(state: GameState = DEFAULT_GAME_STATE, action: actions.Action<any>): GameState {
  if (actions.game.nextState.matches(action)) {
    if (state.mode == State.Pricing) {
      return {mode: State.Placing};
    } else {
      return {mode: State.Pricing};
    }
  } else {
    return state;
  }
}

