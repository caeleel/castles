import Pieces from '../../../lib/pieces';
import { actionCreator } from './helpers'

export namespace piece {
  export const setSelectedId = actionCreator<{ id: string }>('SET_SELECTED_ID');
  export const moveSelectedId = actionCreator<{ x: number, y: number }>('MOVE_SELECTED_ID');
  export const setPieces = actionCreator<{ pieces: Array<Pieces.Piece> }>('SET_PIECES');
}
