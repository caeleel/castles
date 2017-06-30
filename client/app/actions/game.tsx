import { actionCreator } from './helpers'

export namespace game {
  export const echo = actionCreator<{ data: any }>('ECHO');
  export const nextState = actionCreator<{}>('GAME_NEXT_STATE');
  export const setSelectedPieceName = actionCreator<{ playerName: string, pieceName: string }>('GAME_SET_SELECTED_PIECE_NAME');
  export const moveSelectedPiece = actionCreator<{ playerName: string, x: number, y: number }>('GAME_MOVE_SELECTED_ID');
  export const placeSelectedPiece = actionCreator<{ playerName: string }>('GAME_PLACE_SELECTED_PIECE');
}
