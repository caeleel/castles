import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import { AppContainer } from './containers/app';
import castlesApp from './reducers/reducers';
import Pieces from './lib/pieces';

document.addEventListener('DOMContentLoaded', () => {
  Pieces.loadPieces().then((pieces : Pieces.Piece[]) => {
    let store = Redux.createStore(castlesApp, {
      board: {
        pieceIds: [15],
        pieces: pieces,
        selectedPieceId: -1
      }
    })
    ReactDOM.render(
      <ReactRedux.Provider store={store}>
        <AppContainer />
      </ReactRedux.Provider>,
      document.getElementById("castles")
    );
  }).catch(err => {
    console.log(err);
  })
});