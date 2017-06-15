import Pieces from '../../../lib/pieces';
import { actionCreator } from './helpers'

export namespace piece {
  export const setPieces = actionCreator<{ pieceMap: Pieces.PieceMap }>('SET_PIECES');
}
