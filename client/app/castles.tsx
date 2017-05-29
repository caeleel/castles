import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import { Board } from './components/Board';
import * as actions from './actions/actions';
import { gameMiddleware } from './middleware/game';

document.addEventListener('DOMContentLoaded', () => {
  let store = Redux.createStore((state: any, action: any) => {
      return state;
    }, Redux.applyMiddleware(gameMiddleware)
  );

  store.dispatch(actions.game.echo({
    data: 'hello'
  }));

  ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <Board compiler="TypeScript" framework="React" />
    </ReactRedux.Provider>,
    document.getElementById("board")
  );
});
