import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import App, { DataProps, EventHandlerProps } from '../components/app'
import { AppState } from '../reducers/reducers';
import { Score } from '../lib/score';

function mapStateToProps(state: AppState): DataProps {
  let scorablePieceMap = Score.getScorablePieceMap(state.board.pieces, state.board.pieceIds);
  let keys: number[] = [];
  for (let i in scorablePieceMap) {
    keys.push(+i);
  }
  return {
    pieceScores: Score.score(state.board.pieces, keys),
    board: state.board,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    movePiece(id: number, x: number, y: number): void {
      dispatch(actions.board.movePiece({id, x, y}));
    },
    rotatePiece(id: number): void {
      dispatch(actions.board.rotatePiece({id}));
    },
    deletePiece(id: number): void {
      dispatch(actions.board.selectPiece({id: -1}));
      dispatch(actions.board.deletePiece({id: id}));
    },
    addPiece(id: number): void {
      dispatch(actions.board.addPiece({id}));
      dispatch(actions.board.selectPiece({id: -1}));
    },
    selectPiece(id: number): void {
      dispatch(actions.board.selectPiece({id}));
    },
  };
}

export const AppContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(App);

