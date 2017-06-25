import * as React from "react";
import { DragSource } from 'react-dnd';

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

    backgroundImageName() {
      return "/public/" + this.props.piece.name + ".png";
    }
    render() {
      let style = {
        left: this.props.x,
        top: this.props.y,
        height: this.props.piece.height * SCALE,
        width: this.props.piece.width * SCALE
      };

      let innerStyle = {
        backgroundImage: 'url("' + this.backgroundImageName() + '")',
        backgroundSize: "cover",
      }

      return <div style={style}>
        <div onClick={() => this.handleClick()} className={this.classNames()} style={innerStyle}>
          {this.props.piece.name}
        </div>
      </div>;
    }
  }

}
