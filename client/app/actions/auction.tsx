import Pieces from '../../../lib/pieces'
import { actionCreator } from './helpers'

export namespace auction {
  export const swapWithFront = actionCreator<{ index: number }>('AUCTION_SWAP_WITH_FRONT');
  export const setPieces = actionCreator<{ pieceNames: Array<string> }>('AUCTION_SET_PIECES');
  export const selectPiece = actionCreator<{ pieceName: string }>('AUCTION_SELECT_PIECE');
}
