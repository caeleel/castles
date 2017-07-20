import Pieces from '../lib/pieces';
import { actionCreator } from './helpers'

export namespace piece {
  export const setPieces = actionCreator<{ pieces: Pieces.Piece[] }>('SET_PIECES');
}
