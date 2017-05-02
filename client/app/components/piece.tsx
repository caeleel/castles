import * as React from "react";

export interface PieceProps { compiler: string; framework: string; }

// 'PieceProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Piece extends React.Component<PieceProps, undefined> {
    render() {
        return <h1>Piece from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
