import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import { AppContainer } from "./containers/app";
import Pieces from "./lib/pieces";
import castlesApp from "./reducers/reducers";

document.addEventListener("DOMContentLoaded", () => {
  const store = Redux.createStore(castlesApp, {
    board: {
      pieceIds: [15],
      pieces: Pieces.loadPieces(),
      selectedPieceId: -1,
    },
  });
  ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <AppContainer />
    </ReactRedux.Provider>,
    document.getElementById("castles"),
  );
});
