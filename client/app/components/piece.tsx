import * as React from "react";

import Pieces from '../../../lib/pieces';

export const SCALE = 20

export module Piece {
  export interface PieceProps {
    piece: Pieces.Piece;
    rotation: number;
    selected: boolean;
    visible: boolean;
  }

  export class Piece extends React.Component<PieceProps, null> {
    render(): false | JSX.Element {
      let classNames = "piece " + (this.props.piece.type) + " " + (this.props.selected ? "selected" : "");
      let backgroundImageName = "/public/" + this.props.piece.name + ".png";
      let style = {
        height: this.props.piece.height * SCALE,
        width: this.props.piece.width * SCALE,
        visibility: this.props.visible ? "visible" : "hidden",
      };

      let innerStyle = {
        backgroundImage: 'url("' + backgroundImageName + '")',
        backgroundSize: "cover",
        transform: "rotate(" + this.props.rotation + "deg)",
        transition: "rotate 0.5s ease",
      }

      return (
        <div style={style}>
          <div className={classNames} style={innerStyle} />
        </div>
      );
    }
  }

}
