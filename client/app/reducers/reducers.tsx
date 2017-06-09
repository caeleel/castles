import { combineReducers } from 'redux'

import {
  AuctionState,
  auctionReducer,
} from './auction';
import {
  GameState,
  gameReducer,
} from './game';
import {
  PiecesState,
  piecesReducer,
} from './pieces';

export interface AppState {
  pieces: PiecesState;
  auction: AuctionState;
  game: GameState;
}

const castlesApp = combineReducers<AppState>({
  auction: auctionReducer,
  game: gameReducer,
  pieces: piecesReducer,
})

export default castlesApp
