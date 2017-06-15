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

  export class ActivePiece extends React.Component<ActivePieceProps, undefined> {

    classNames() {
      return "piece " + (this.props.piece.type);
    }

    render() {
      let style = {
        left: this.props.x,
        top: this.props.y,
        height: this.props.piece.height * SCALE,
        width: this.props.piece.width * SCALE
      };

      return <div className={this.classNames()} style={style}>
        {this.props.piece.name}
      </div>;
    }
  }
}
