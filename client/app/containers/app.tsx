import { connect } from 'react-redux'
import App, { Props } from '../components/app'
import { AppState } from '../reducers/reducers';
import { Score } from '../../../lib/score';

function mapStateToProps(state: AppState): Props {
  return {
    score: Score.score(state.board.pieces, state.board.pieceIds)
  };
}

export const AppContainer = connect<Props, {}, {}>(
  mapStateToProps,
  {},
)(App);
