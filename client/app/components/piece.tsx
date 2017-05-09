import * as React from "react";

import { Pieces } from '../../../lib/pieces';

interface Position {
    x: number;
    y: number;
}

export module Piece {
    export interface PieceProps { piece: Pieces.Piece; }

    // 'PieceProps' describes the shape of props.
    // State is never set so we use the 'undefined' type.
    export class Piece extends React.Component<PieceProps, undefined> {
        render() {

            let style = {
                x: this.props.piece.x,
                y: this.props.piece.y,
                height: this.props.piece.height,
                width: this.props.piece.width,
                backgroundColor: '#AAAAAA'
            };

            return <div className="piece" style={style}></div>;
        }
    }
}
