import Pieces from '../../../lib/pieces'
import { actionCreator } from './helpers'

export namespace auction {
  export const swapWithFront = actionCreator<{ index: number }>('AUCTION_SWAP_WITH_FRONT');
  export const setPieces = actionCreator<{ pieceIds: Array<string> }>('AUCTION_SET_PIECES');
}
