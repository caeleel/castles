import { combineReducers } from "redux";

import {
  boardReducer,
  BoardState,
} from "./board";

export interface AppState {
  board: BoardState;
}

const castlesApp = combineReducers<AppState>({
  board: boardReducer,
});

export default castlesApp;
