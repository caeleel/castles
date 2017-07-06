import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import GameContainer from './containers/game';
import { gameMiddleware } from './middleware/game';
import castlesApp from './reducers/reducers';
import Pieces from '../../lib/pieces';

document.addEventListener('DOMContentLoaded', () => {
    Pieces.loadPieces().then((pieceMap : Pieces.PieceMap) => {
      let store = Redux.createStore(castlesApp, {
        board: {
          score: 0,
          pieces: [{name: "Foyer", x: 20, y: 10, rotation: 0}, {name: "Anteroom", x: 20, y: 16, rotation: 0}],
          selectedPieceName: ""
        },
        pieces: {
          pieceMap: pieceMap
        },
      }, Redux.applyMiddleware(gameMiddleware))
      ReactDOM.render(
        <ReactRedux.Provider store={store}>
          <GameContainer />
        </ReactRedux.Provider>,
        document.getElementById("castles")
      );
    }).catch(err => {
      console.log(err);
    })
});
