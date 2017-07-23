import * as React from "react";
import {
  ConnectDragSource,
  ConnectDragPreview,
  DragDropContext,
  DragSource,
  DragSourceSpec,
  DragSourceCollector,
  DragSourceConnector,
  DragSourceMonitor,
  DragElementWrapper,
  ClientOffset } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import Pieces from '../lib/pieces';

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
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  selectPiece(id: number): void;
  selected: boolean;
  scorable: boolean;
  score: number;
  zoomScale: number;
}

function getRotation(orientation: number[]) {
  return Math.atan2(orientation[1], orientation[0]);
}

export module Piece {
  @DragSource("piece", sourceSpec, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }))
  export class Piece extends React.Component<PieceProps, {}> {
    render(): false | JSX.Element {
      this.props.connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      });
      const { offsetX, offsetY, selected, connectDragSource, isDragging, piece, scorable, zoomScale } = this.props;

      let piecePositionStyle = {
        left: piece.x * zoomScale + offsetX,
        top: piece.y * zoomScale + offsetY,
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
      let imageName = "public/" + piece.name.toLowerCase() + ".png";
      let rotation = getRotation(piece.orientation);
      let imgStyle = {
        left: x * zoomScale,
        top: y * zoomScale,
        transform: "rotate(" + rotation + "rad)",
        transformOrigin: "top left",
        height: height * zoomScale,
        width: width * zoomScale,
      }

      let scoreBubbleStyle = { // Move score bubbles for rotated L pieces
        left: (piece.type == "L" && piece.orientation[0] == 0 && piece.orientation[1] == -1) ? zoomScale * 4 : "auto"
      }

      let selectPiece = (e: Event): void => {
        e.stopPropagation();
        this.props.selectPiece(this.props.id);
      }

      return connectDragSource(
        <div className="piece-position" style={piecePositionStyle}>
          {piece.exits.map((exit: number[]) => {
            let height = .3 * zoomScale;
            let width = .3 * zoomScale;
            let [x, y] = exit
            let exitStyle = {
              height,
              width,
              left: x * zoomScale - width / 2 - 1,
              top: y * zoomScale - height / 2 - 1,
            }
            return <div className="exit" key={x + "-" + y} style={exitStyle} />
            }
          )}

          {this.props.scorable && (<div className="score" style={scoreBubbleStyle}>{this.props.score}</div>)}
          <img src={imageName} className={classNames} style={imgStyle} onClick={selectPiece.bind(this)} />
        </div>
      );
    }
  }
}
