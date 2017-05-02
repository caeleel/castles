import * as React from "react";
import * as ReactDOM from "react-dom";

import { Piece } from "./components/Piece";

ReactDOM.render(
    <Piece compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
