import { connect } from 'react-redux'
import App, { Props } from '../components/app'
import { AppState } from '../reducers/reducers';

function mapStateToProps(state: AppState): Props {
  return {
    score: state.board.score
  };
}

export const AppContainer = connect<Props, {}, {}>(
  mapStateToProps,
  {},
)(App);
