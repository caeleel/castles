import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Board, DataProps, EventHandlerProps } from '../components/board'
import { AppState } from '../reducers/reducers';

function mapStateToProps(state: AppState): DataProps {
  return {
    board: state.board,
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

