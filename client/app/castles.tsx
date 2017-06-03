import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import BoardContainer from './containers/board';
import * as actions from './actions/actions';
import { gameMiddleware } from './middleware/game';
import castlesApp from './reducers/reducers';
import Pieces from '../../lib/pieces';

document.addEventListener('DOMContentLoaded', () => {
    Pieces.loadPieces().then((pieces : Pieces.Piece[]) => {
      let store = Redux.createStore(castlesApp, {pieces: {pieces: pieces, selectedId: ""}}, Redux.applyMiddleware(gameMiddleware))
      ReactDOM.render(
        <ReactRedux.Provider store={store}>
          <BoardContainer />
        </ReactRedux.Provider>,
        document.getElementById("board")
      );
    }).catch(err => {
      console.log(err);
    })

  // let store = Redux.createStore((state: any, action: any) => {
  //     return state;
  //   }, Redux.applyMiddleware(gameMiddleware)
  // );

  // store.dispatch(actions.game.echo({
  //   data: 'hello'
  // }));


});
