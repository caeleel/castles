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
    selectedPieceId: state.board.selectedPieceId,
    pieceMap: state.pieces.pieceMap,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    movePiece(id: number, x: number, y: number): void {
      dispatch(actions.board.movePiece({id, x, y}));
    },
    rotatePiece(id: number, increment: number): void {
      dispatch(actions.board.rotatePiece({id, increment}));
    },
    selectPiece(id: number): void {
      dispatch(actions.board.setSelectedPieceId({id}));
    },
    setScore(score: number): void {
      dispatch(actions.board.setScore({score}));
    }
  };
}

export const BoardContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

