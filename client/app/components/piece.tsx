import * as React from "react";
import {
  ConnectDragSource,
  DragDropContext,
  DragSource,
  DragSourceSpec,
  DragSourceCollector,
  DragSourceConnector,
  DragSourceMonitor,
  DragElementWrapper,
  ClientOffset } from 'react-dnd';
import Pieces from '../../../lib/pieces';

export const SCALE = 20;
// Spec: drag events to handle.
let sourceSpec: DragSourceSpec<PieceProps> = {
  beginDrag: (props: PieceProps) => ({
    id: props.id,
    x: props.piece.x,
    y: props.piece.y,
  }),
};

interface PieceProps {
  id: number;
  piece: Pieces.Piece;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  selectPiece(id: number): void;
  selected: boolean;
  scorable: boolean;
  score: number;
}

function getRotation(orientation: number[]) {
  return Math.atan2(orientation[1], orientation[0]);
}

export module Piece {
  @DragSource("piece", sourceSpec, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
  export class Piece extends React.Component<PieceProps, {}> {
    constructor(props: PieceProps) {
      super(props);
    }

    render(): false | JSX.Element {
      const { selected, connectDragSource, isDragging, piece, scorable } = this.props;

      let style = {
        left: piece.x * SCALE,
        top: piece.y * SCALE,
        height: 0,
        width: 0,
      }

      let width = piece.width;
      let height = piece.height;
      let x = 0;
      let y = 0;

      if (piece.orientation[0] == 0) {
        width = piece.height;
        height = piece.width;
      }
      if (piece.orientation[1] - piece.orientation[0] == 1) {
        x += piece.width;
      }

      if (piece.orientation[0] + piece.orientation[1] == -1) {
        y += piece.height;
      }


      // [1, 0] do nothing
      // [0, 1] x += piece.width
      // [-1, 0] y += piece.height; x += piece.width
      // [0, -1] y += piece.height

      let classNames = "piece " + (piece.type) + " " + (selected ? "selected" : "") + " " + (scorable ? "scorable" : "");
      let backgroundImageName = "public/" + piece.name.toLowerCase() + ".png";
      let rotation = getRotation(piece.orientation);
      let innerStyle = {
        left: x * SCALE,
        top: y * SCALE,
        transform: "rotate(" + rotation + "rad)",
        transformOrigin: "top left",
        height: height * SCALE,
        width: width * SCALE,
      }

      let selectPiece = (e: Event): void => {
        e.stopPropagation();
        this.props.selectPiece(this.props.id);
      }

      return connectDragSource(
        <div className="piece-position" style={style}>
          {piece.exits.map((exit: number[]) => {
            let height = 8;
            let width = 8;
            let [x, y] = exit
            let style = {
              height,
              width,
              left: x * SCALE - width / 2 - 1,
              top: y * SCALE - height / 2 - 1,
            }
            return <div className="exit" key={x + "-" + y} style={style} />
            }
          )}

          {this.props.scorable && (
            <div className="score">{this.props.score}</div>
          )}
          <img src={backgroundImageName} className={classNames} style={innerStyle} onClick={selectPiece.bind(this)} />
        </div>
      );
    }
  }
}
