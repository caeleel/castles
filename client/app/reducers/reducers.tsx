import { combineReducers } from 'redux'

import {
  AuctionState,
  auctionReducer,
} from './auction';
import {
  BoardState,
  boardReducer,
} from './board';
import {
  GameState,
  gameReducer,
} from './game';
import {
  PiecesState,
  piecesReducer,
} from './pieces';

export interface AppState {
  auction: AuctionState;
  board: BoardState;
  game: GameState;
  pieces: PiecesState;
}

const castlesApp = combineReducers<AppState>({
  auction: auctionReducer,
  board: boardReducer,
  game: gameReducer,
  pieces: piecesReducer,
})

export default castlesApp
