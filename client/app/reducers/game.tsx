import * as actions from '../actions/actions';

export interface GameState {
  currentPlayerName: string;
  mode: State;
}

export enum State {
  Pricing,
  Placing,
}

export const DEFAULT_GAME_STATE: GameState = {
  currentPlayerName: "golf",
  mode: State.Pricing,
};

export function gameReducer(state: GameState = DEFAULT_GAME_STATE, action: actions.Action<any>): GameState {
  if (actions.game.nextState.matches(action)) {
    if (state.mode == State.Pricing) {
      return {currentPlayerName: state.currentPlayerName, mode: State.Placing};
    } else {
      return {currentPlayerName: state.currentPlayerName, mode: State.Pricing};
    }
  } else {
    return state;
  }
}

