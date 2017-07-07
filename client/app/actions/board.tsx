import { actionCreator } from './helpers'

export namespace board {
  export const setSelectedPieceName = actionCreator<{ name: string }>('BOARD_SET_SELECTED_PIECE_NAME');
  export const movePiece = actionCreator<{ name: string, x: number, y: number }>('BOARD_MOVE_SELECTED_ID');
  export const addPiece = actionCreator<{ name: string }>('BOARD_ADD_PIECE');
  export const deletePiece = actionCreator<{ name: string }>('BOARD_DELETE_PIECE');
  export const rotatePiece = actionCreator<{ name: string, increment: number }>('BOARD_ROTATE_SELECTED');
}
