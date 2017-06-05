import * as actions from '../actions/actions';
import Pieces from '../../../lib/pieces';

export interface AuctionPiece {
  pieceId: string;
  juice: number;
}

export interface AuctionState {
  pieceIds: Array<AuctionPiece>;
}

export const DEFAULT_AUCTION_STATE: AuctionState = {
  pieceIds: [{pieceId: "1", juice: 0}] as Array<AuctionPiece>,
};

export function auctionReducer(state: AuctionState = DEFAULT_AUCTION_STATE, action: actions.Action<any>): AuctionState {
  if (actions.auction.swapWithFront.matches(action)) {
    let pieceIds = state.pieceIds;
    let temp = state.pieceIds[0];
    pieceIds[0] = pieceIds[action.payload.index];
    pieceIds[action.payload.index] = temp;
    return {
      pieceIds: pieceIds,
    }
  } else if (actions.auction.setPieces.matches(action)) {
    let pieces = action.payload.pieceIds;
    return {
      pieceIds: pieces.map((pieceId) => {
        return {pieceId: pieceId, juice: 0};
      }),
    }
  } else {
    return state;
  }
}
