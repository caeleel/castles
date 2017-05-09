import * as React from "react";
import * as ReactDOM from "react-dom";

import { Board } from "./components/Board";

ReactDOM.render(
    <Board compiler="TypeScript" framework="React" />,
    document.getElementById("board")
);
