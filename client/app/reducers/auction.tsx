import * as actions from '../actions/actions';
import Pieces from '../../../lib/pieces';

export interface AuctionPiece {
  pieceName: string;
  juice: number;
}

export interface AuctionState {
  pieceNames: Array<AuctionPiece>;
}

export const DEFAULT_AUCTION_STATE: AuctionState = {
  pieceNames: [{pieceName: "1", juice: 0}] as Array<AuctionPiece>,
};

export function auctionReducer(state: AuctionState = DEFAULT_AUCTION_STATE, action: actions.Action<any>): AuctionState {
  if (actions.auction.swapWithFront.matches(action)) {
    let pieceNames = state.pieceNames;
    let temp = state.pieceNames[0];
    pieceNames[0] = pieceNames[action.payload.index];
    pieceNames[action.payload.index] = temp;
    return {
      pieceNames: pieceNames,
    }
  } else if (actions.auction.setPieces.matches(action)) {
    let pieces = action.payload.pieceNames;
    return {
      pieceNames: pieces.map((pieceName) => {
        return {pieceName: pieceName, juice: 0};
      }),
    }
  } else {
    return state;
  }
}
