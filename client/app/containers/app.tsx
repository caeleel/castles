import { connect } from 'react-redux'
import App, { Props } from '../components/app'
import { AppState } from '../reducers/reducers';
import { Score } from '../../../lib/score';

function mapStateToProps(state: AppState): Props {
  let scorablePieceMap = Score.getScorablePieceMap(state.board.pieces, state.board.pieceIds);
  let keys: number[] = [];
  for (let i in scorablePieceMap) {
    keys.push(+i);
  }
  return {
    pieceScores: Score.score(state.board.pieces, keys),
  };
}

export const AppContainer = connect<Props, {}, {}>(
  mapStateToProps,
  {},
)(App);
