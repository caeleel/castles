import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Auction, DataProps, EventHandlerProps } from '../components/Auction'
import { Piece } from '../components/piece'
import Pieces from '../../../lib/pieces';
import { AppState } from '../reducers/reducers';

function mapStateToProps(state: AppState): DataProps {
  return {
    pieces: state.auction.pieceNames,
    selectedId: state.pieces.selectedId,
    pieceMap: state.pieces.pieceMap,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: Piece.PieceProps): EventHandlerProps {
  return {
    swapWithFront(index: number): void {
        dispatch(actions.auction.swapWithFront({index: index}));
    },
  };
}

const AuctionContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Auction);

export default AuctionContainer
