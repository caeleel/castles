import { combineReducers } from 'redux'

import {
  BoardState,
  boardReducer,
} from './board';
import {
  PiecesState,
  piecesReducer,
} from './pieces';

export interface AppState {
  board: BoardState;
  pieces: PiecesState;
}

const castlesApp = combineReducers<AppState>({
  board: boardReducer,
  pieces: piecesReducer,
})

export default castlesApp
