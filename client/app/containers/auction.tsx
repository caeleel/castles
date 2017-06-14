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
    playerName: state.board.playerNames[0],
    pieceNames: state.auction.pieceNames,
    selectedPieceName: state.board.byPlayerName[state.board.playerNames[0]].selectedPiece.name,
    pieceMap: state.pieces.pieceMap,
    pricing: state.game.mode == State.Pricing,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    swapWithFront(index: number): void {
      console.log("SWAPPING WITH FRONT")
      dispatch(actions.auction.swapWithFront({index: index}));
    },
    continueClick(): void {
      console.log("CONTINUE CLICK LEESSGO")
      dispatch(actions.game.nextState());
    },
    setSelectedIndex(playerName: string, index: number): void {
      dispatch(actions.piece.setSelectedPieceName({playerName: playerName, pieceName: index + ""}))
    }
  };
}

const AuctionContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Auction);

export default AuctionContainer
