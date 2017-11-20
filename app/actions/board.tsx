import Pieces from "../lib/pieces";
import { actionCreator } from "./helpers";

export namespace board {
  export const addPiece = actionCreator<{ id: number }>("BOARD_ADD_PIECE");
  export const movePiece = actionCreator<{ id: number, x: number, y: number }>("BOARD_MOVE_SELECTED_ID");
  export const selectPiece = actionCreator<{ id: number }>("BOARD_SELECT_PIECE");
  export const deletePiece = actionCreator<{ id: number }>("BOARD_DELETE_PIECE");
  export const rotatePiece = actionCreator<{ id: number }>("BOARD_ROTATE_SELECTED");
  export const setPieces = actionCreator<{ pieces: Pieces.Piece[] }>("BOARD_SET_PIECES");
}
