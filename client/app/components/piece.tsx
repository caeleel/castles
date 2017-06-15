import * as React from "react";

import Pieces from '../../../lib/pieces';

const SCALE = 20;

export module Piece {
  export interface PieceProps {
    piece: Pieces.Piece;
    x: number;
    y: number;
    rotation: number;
    selected: boolean;
    onClick: () => void;
  }

  export class Piece extends React.Component<PieceProps, undefined> {
    handleClick() {
      this.props.onClick()
    }

    classNames() {
      return "piece " + (this.props.piece.type) + " " + (this.props.selected ? "selected" : "")
    }

    render() {
      let style = {
        left: this.props.x,
        top: this.props.y,
        height: this.props.piece.height * SCALE,
        width: this.props.piece.width * SCALE
      };

      return <div onClick={() => this.handleClick()} className={this.classNames()} style={style}>
        {this.props.piece.name}
      </div>;
    }
  }
}
