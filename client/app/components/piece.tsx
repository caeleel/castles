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
    name: props.piece.name,
    x: props.x,
    y: props.y,
  }),
};

interface PieceProps {
  isDragging : boolean;
  connectDragSource: ConnectDragSource;
  rotatePiece(name: string, increment: number): void;
  selectPiece(name: string): void;
  piece: Pieces.Piece;
  x: number;
  y: number;
  rotation: number;
  selected: boolean;
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
      const { x, y, rotation, selected, connectDragSource, isDragging, piece, rotatePiece } = this.props;
      let style = {
        left: x * SCALE,
        top: y * SCALE,
        height: piece.height * SCALE,
        width: piece.width * SCALE,
      }
      let classNames = "piece " + (piece.type) + " " + (selected ? "selected" : "");
      let backgroundImageName = "/public/" + piece.name + ".png";

      let innerStyle = {
        backgroundImage: 'url("' + backgroundImageName + '")',
        backgroundSize: "cover",
        transform: "rotate(" + this.props.rotation + "deg)",
        transition: "rotate 0.5s ease",
      }

      let rotateLeft = (e: Event): void => {
        e.stopPropagation();
        this.props.rotatePiece(this.props.piece.name, -90);
      }

      let rotateRight = (e: Event): void => {
        e.stopPropagation();
        this.props.rotatePiece(this.props.piece.name, 90);
      }

      let selectPiece = (e: Event): void => {
        e.stopPropagation();
        this.props.selectPiece(this.props.piece.name);
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

          {selected && (<button className="rotate rotate-left" style={{left: -5 - 27}} onClick={rotateLeft.bind(this)}></button>)}
          {selected && (<button className="rotate rotate-right" style={{left: piece.width * SCALE + 5}} onClick={rotateRight.bind(this)}></button>)}
          <div className={classNames} style={innerStyle} onClick={selectPiece.bind(this)} />
        </div>
      );
    }
  }
}
