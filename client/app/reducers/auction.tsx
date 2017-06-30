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
  if (actions.auction.swapPieces.matches(action)) {
    let pieceNames = state.pieceNames.slice();
    let temp = state.pieceNames[action.payload.i];
    pieceNames[action.payload.i] = pieceNames[action.payload.j];
    pieceNames[action.payload.j] = temp;
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
  } else if (actions.auction.removeSelectedPiece.matches(action)) {
    let pieceNames = state.pieceNames.slice();
    pieceNames = pieceNames.filter((auctionPiece) => { return action.payload.name !== auctionPiece.pieceName; });
    return {pieceNames};
  } else {
    return state;
  }
}
