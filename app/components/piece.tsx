import * as React from "react";
import {
  ClientOffset,
  ConnectDragPreview,
  ConnectDragSource,
  DragDropContext,
  DragElementWrapper,
  DragSource,
  DragSourceCollector,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { PieceGlow } from "./piece-glow";

import Pieces from "../lib/pieces";

const sourceSpec: DragSourceSpec<PieceProps> = {
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

export namespace Piece {
  @DragSource("piece", sourceSpec, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }))
  export class Piece extends React.PureComponent<PieceProps, {}> {
    public render(): false | JSX.Element {
      this.props.connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      });
      const { id, selected, connectDragSource, isDragging, piece, scorable, zoomScale } = this.props;

      const piecePositionStyle = {
        left: piece.x * zoomScale,
        top: piece.y * zoomScale,
        height: 0,
        width: 0,
      };

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

      const classNames = "piece " + (piece.type) + " " + (selected ? "selected" : "") + " " + (scorable ? "scorable" : "");
      const imageName = "public/" + piece.name.toLowerCase() + ".png";
      const rotation = getRotation(piece.orientation);
      const imgStyle = {
        left: x * zoomScale,
        top: y * zoomScale,
        height: height * zoomScale,
        width: width * zoomScale,
        transform: "rotate(" + rotation + "rad)",
      };

      const scoreBubbleStyle = { // Move score bubbles for rotated L pieces
        left: (piece.type == "L" && piece.orientation[0] == 0 && piece.orientation[1] == -1) ? zoomScale * 4 : "auto",
      };

      const selectPiece = (e: Event): void => {
        e.stopPropagation();
        this.props.selectPiece(this.props.id);
      };

      return connectDragSource(
        <div className="piece-position" style={piecePositionStyle}>
          <PieceGlow.PieceGlow
            id={id}
            type={piece.type}
            x={x}
            y={y}
            height={height}
            width={width}
            zoomScale={zoomScale}
            rotation={rotation}
            scorable={scorable}
          />
          <img src={imageName} className={classNames} style={imgStyle} onClick={selectPiece.bind(this)} />
          {piece.exits.map((exit: number[]) => {
            const height = .3 * zoomScale;
            const width = .3 * zoomScale;
            const [x, y] = exit;
            const exitStyle = {
              height,
              width,
              left: x * zoomScale - width / 2 - 1,
              top: y * zoomScale - height / 2 - 1,
            };
            return <div className={"exit " + (selected ? "selected" : "")} key={x + "-" + y} style={exitStyle} />;
            },
          )}

          {this.props.scorable && (<div className={"score " + (selected ? "selected" : "")} style={scoreBubbleStyle}>{this.props.score}</div>)}
        </div>,
      );
    }
  }
}
