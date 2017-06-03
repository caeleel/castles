import { combineReducers } from 'redux'

import {
  PiecesState,
  piecesReducer,
} from './pieces';
import {
  TurnsState,
  turnsReducer,
} from './turn';

export interface AppState {
  pieces: PiecesState;
  turns: TurnsState;
}

const castlesApp = combineReducers<AppState>({
  pieces: piecesReducer,
  turn: turnsReducer,
})

export default castlesApp
