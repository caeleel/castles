import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Board, DataProps, EventHandlerProps } from '../components/board'
import { Piece } from '../components/piece'
import Pieces from '../../../lib/pieces';
import { AppState } from '../reducers/reducers';
import { BoardState } from '../reducers/board';

function mapStateToProps(state: AppState): DataProps {
  return {
    pieces: state.board.pieces,
    selectedPieceName: state.board.selectedPieceName,
    pieceMap: state.pieces.pieceMap,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    movePiece(name: string, x: number, y: number): void {
      dispatch(actions.board.movePiece({name, x, y}));
    },
    rotatePiece(name: string, increment: number): void {
      dispatch(actions.board.rotatePiece({name, increment}));
    },
    selectPiece(name: string): void {
      dispatch(actions.board.setSelectedPieceName({name}));
    }
  };
}

export const BoardContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

