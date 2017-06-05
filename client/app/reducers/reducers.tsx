import { combineReducers } from 'redux'

import {
  AuctionState,
  auctionReducer,
} from './auction';
import {
  PiecesState,
  piecesReducer,
} from './pieces';

export interface AppState {
  pieces: PiecesState;
  auction: AuctionState;
}

const castlesApp = combineReducers<AppState>({
  auction: auctionReducer,
  pieces: piecesReducer,
})

export default castlesApp
