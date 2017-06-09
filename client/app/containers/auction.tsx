import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Auction, DataProps, EventHandlerProps } from '../components/Auction'
import { Piece } from '../components/piece'
import Pieces from '../../../lib/pieces';
import { AppState } from '../reducers/reducers';
import { State } from '../reducers/game'

function mapStateToProps(state: AppState): DataProps {
  return {
    pieces: state.auction.pieceNames,
    selectedId: state.pieces.selectedId,
    pieceMap: state.pieces.pieceMap,
    pricing: state.game.mode == State.Pricing,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: Piece.PieceProps): EventHandlerProps {
  return {
    swapWithFront(index: number): void {
      console.log("SWAPPING WITH FRONT")
      dispatch(actions.auction.swapWithFront({index: index}));
    },
    continueClick(): void {
      console.log("CONTINUE CLICK LEESSGO")
      dispatch(actions.game.nextState());
    },
    setSelectedIndex(index: number): void {
      dispatch(actions.piece.setSelectedId({id: index + ""}))
    }
  };
}

const AuctionContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Auction);

export default AuctionContainer
