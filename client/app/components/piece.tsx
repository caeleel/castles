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
  rotatePiece(id: number): void;
  selectPiece(id: number): void;
  selected: boolean;
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
      const { selected, connectDragSource, isDragging, piece, rotatePiece } = this.props;
      let style = {
        left: piece.x * SCALE,
        top: piece.y * SCALE,
        height: piece.height * SCALE,
        width: piece.width * SCALE,
      }
      let classNames = "piece " + (piece.type) + " " + (selected ? "selected" : "");
      let backgroundImageName = "public/" + piece.name.toLowerCase() + ".png";
      let rotation = getRotation(piece.orientation);
      let innerStyle = {
        backgroundImage: 'url("' + backgroundImageName + '")',
        backgroundSize: "cover",
        backgroundColor: "transparent",
        transform: "rotate(" + rotation + "rad)",
        transition: "rotate 0.5s ease",
      }

      let rotateLeft = (e: Event): void => {
        e.stopPropagation();
        this.props.rotatePiece(this.props.id);
        this.props.rotatePiece(this.props.id);
        this.props.rotatePiece(this.props.id);
      }

      let rotateRight = (e: Event): void => {
        e.stopPropagation();
        this.props.rotatePiece(this.props.id);
      }

      let selectPiece = (e: Event): void => {
        e.stopPropagation();
        this.props.selectPiece(this.props.id);
      }

      return connectDragSource(
        <div className="piece-position" style={style}>
          {piece.exits.map((exit: number[], i: number) => {
            let [x, y] = exit
            let style = {
              left: x * SCALE,
              top: y * SCALE,
            }
            return <div className="exit" key={x + "-" + y} style={style} />
            }
          )}

          <div className={classNames} style={innerStyle} onClick={selectPiece.bind(this)} />
          {selected && (<button className="rotate rotate-left" style={{left: -5 - 27}} onClick={rotateLeft.bind(this)}></button>)}
          {selected && (<button className="rotate rotate-right" style={{left: piece.width * SCALE + 5}} onClick={rotateRight.bind(this)}></button>)}
        </div>
      );
    }
  }
}
