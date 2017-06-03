import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import BoardContainer from './containers/board';
import * as actions from './actions/actions';
import { gameMiddleware } from './middleware/game';
import castlesApp from './reducers/reducers';

document.addEventListener('DOMContentLoaded', () => {
  let store = Redux.createStore(castlesApp)
  // let store = Redux.createStore((state: any, action: any) => {
  //     return state;
  //   }, Redux.applyMiddleware(gameMiddleware)
  // );

  // store.dispatch(actions.game.echo({
  //   data: 'hello'
  // }));
  // let lol: Array<Pieces.Piece> = []
  // Pieces.loadPieces().then((pieces : Pieces.Piece[]) => {
  //   //this.setState({pieces: pieces});
  //   store.dispatch(actions.setPieces(pieces));
  // }).catch(err => {
  //   console.log(err);
  // })


  ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <BoardContainer />
    </ReactRedux.Provider>,
    document.getElementById("board")
  );
});
