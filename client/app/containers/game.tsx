import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import Game, { DataProps, EventHandlerProps } from '../components/game'
import { Piece } from '../components/piece'
import Pieces from '../../../lib/pieces';
import { AppState } from '../reducers/reducers';
import { BoardState } from '../reducers/board';

function mapStateToProps(state: AppState): DataProps {
  return {
    board: state.board,
    pieceMap: state.pieces.pieceMap,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    deletePiece(name: string): void {
      dispatch(actions.board.deletePiece({name: name}));
    },
    addClick(name: string): void {
      dispatch(actions.board.addPiece({name: name}));
    },
  };
}

const GameContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

export default GameContainer
