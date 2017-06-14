import * as React from "react";

import Pieces from '../../../lib/pieces';

const SCALE = 20;

export module ActivePiece {
  export interface ActivePieceProps {
    piece: Pieces.Piece;
    x: number;
    y: number;
    rotation: number;
  }

  // 'PieceProps' describes the shape of props.
  // State is never set so we use the 'undefined' type.
  export class ActivePiece extends React.Component<ActivePieceProps, undefined> {
    render() {
      let style = {
        left: this.props.x,
        top: this.props.y,
        height: this.props.piece.height * SCALE,
        width: this.props.piece.width * SCALE
      };

      return <div className="piece" style={style}>
        {this.props.piece.name}
      </div>;
    }
  }
}
