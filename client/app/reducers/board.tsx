import * as actions from '../actions/actions';
import Players from '../../../lib/players';
import Pieces from '../../../lib/pieces';

interface BoardMap {
  [name: string]: Players.Player
}

export interface BoardState {
  byPlayerName: BoardMap;
  playerNames: string[];
}

export const DEFAULT_BOARD_STATE: BoardState = {
  byPlayerName: {"golf": {name: "golf", score: 0, pieces: [{name: "test", x: 1, y: 1, rotation: 0}], selectedPiece: {name: "test", x: 1, y: 1, rotation: 0}}},
  playerNames: ["golf"],
};

export function boardReducer(state: BoardState = DEFAULT_BOARD_STATE, action: actions.Action<any>): BoardState {
  if (actions.game.setSelectedPieceName.matches(action)) {
    state = Object.assign({}, state);
    state.byPlayerName[action.payload.playerName].selectedPiece.name = action.payload.pieceName;
    state.byPlayerName[action.payload.playerName].selectedPiece.rotation = 0;
    return state;
  } else if (actions.game.moveSelectedPiece.matches(action)) {
    state = Object.assign({}, state);
    state.byPlayerName[action.payload.playerName].selectedPiece.x = action.payload.x;
    state.byPlayerName[action.payload.playerName].selectedPiece.y = action.payload.y;
    return state;
  } else {
    return state;
  }
}
