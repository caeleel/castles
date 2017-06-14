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
  byPlayerName: {"golf": {name: "golf", pieces: [{name: "test", x: 1, y: 1, rotation: 0}], selectedPiece: {name: "test", x: 1, y: 1, rotation: 0}}},
  playerNames: ["golf"],
};

export function boardReducer(state: BoardState = DEFAULT_BOARD_STATE, action: actions.Action<any>): BoardState {
  if (actions.piece.setSelectedPieceName.matches(action)) {
    state.byPlayerName[action.payload.playerName].selectedPiece.name = action.payload.pieceName;
    return {
      ...state,
    }
  } else if (actions.piece.moveSelectedPiece.matches(action)) {
    state.byPlayerName[action.payload.playerName].selectedPiece.x = action.payload.x;
    state.byPlayerName[action.payload.playerName].selectedPiece.y = action.payload.y;
    return state;
  } else {
    return state;
  }
}
