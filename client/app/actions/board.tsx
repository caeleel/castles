import { actionCreator } from './helpers'

export namespace board {
  export const addPiece = actionCreator<{ name: string }>('BOARD_ADD_PIECE');
  export const movePiece = actionCreator<{ id: number, x: number, y: number }>('BOARD_MOVE_SELECTED_ID');
  export const setSelectedPieceId = actionCreator<{ id: number }>('BOARD_SET_SELECTED_PIECE_ID');
  export const deletePiece = actionCreator<{ id: number }>('BOARD_DELETE_PIECE');
  export const rotatePiece = actionCreator<{ id: number, increment: number }>('BOARD_ROTATE_SELECTED');
  export const setScore = actionCreator<{ score: number }>('BOARD_SET_SCORE');
}
