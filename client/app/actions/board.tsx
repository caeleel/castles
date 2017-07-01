import { actionCreator } from './helpers'

export namespace board {
  export const setSelectedPieceName = actionCreator<{ playerName: string, pieceName: string }>('BOARD_SET_SELECTED_PIECE_NAME');
  export const movePiece = actionCreator<{ pieceName: string, playerName: string, x: number, y: number }>('BOARD_MOVE_SELECTED_ID');
  export const placeSelectedPiece = actionCreator<{ playerName: string }>('BOARD_PLACE_SELECTED_PIECE');
  export const rotateSelected = actionCreator<{ playerName: string, increment: number }>('BOARD_ROTATE_SELECTED');
}
