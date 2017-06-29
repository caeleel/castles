import Pieces from '../../../lib/pieces'
import { actionCreator } from './helpers'

export namespace auction {
  export const swapPieces = actionCreator<{ i: number, j: number }>('AUCTION_SWAP_PIECES');
  export const setPieces = actionCreator<{ pieceNames: Array<string> }>('AUCTION_SET_PIECES');
}
