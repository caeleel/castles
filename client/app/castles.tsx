import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import GameContainer from './containers/game';
import { gameMiddleware } from './middleware/game';
import castlesApp from './reducers/reducers';
import { State } from './reducers/game';
import Pieces from '../../lib/pieces';

document.addEventListener('DOMContentLoaded', () => {
    Pieces.loadPieces().then((pieceMap : Pieces.PieceMap) => {
      let store = Redux.createStore(castlesApp, {
        board: {
          byPlayerName: {
            "golf": {
              name: "golf",
              score: 0,
              pieces: [{name: "Anteroom", x: 150, y: 150, rotation: 0}],
              selectedPiece: null
            }
          },
          playerNames: ["golf"],
        },
        pieces: {
          pieceMap: pieceMap
        },
        game: {currentPlayerName: "golf", mode: State.Pricing},
        auction: {
          pieceNames: [
            {pieceName: "Larder", juice: 0},
            {pieceName: "Secret Lair", juice: 1},
            {pieceName: "Billiards Room", juice: 0},
            {pieceName: "Pumpkin Garden", juice: 0},
            {pieceName: "Stables", juice: 2}
          ]
        }}, Redux.applyMiddleware(gameMiddleware))
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
