import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import Auction from './containers/auction';
import GameContainer from './containers/game';
import * as actions from './actions/actions';
import { gameMiddleware } from './middleware/game';
import castlesApp from './reducers/reducers';
import Pieces from '../../lib/pieces';

document.addEventListener('DOMContentLoaded', () => {
    Pieces.loadPieces().then((pieceMap : Pieces.PieceMap) => {
      let store = Redux.createStore(castlesApp, {pieces: {pieceMap: pieceMap, selectedId: ""}, auction: {pieceNames: [{pieceName: "Buttery", juice: 0}, {pieceName: "Salon", juice: 0}, {pieceName: "Train Room", juice: 0}]}}, Redux.applyMiddleware(gameMiddleware))
      ReactDOM.render(
        <ReactRedux.Provider store={store}>
          <GameContainer />
        </ReactRedux.Provider>,
        document.getElementById("castles")
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
