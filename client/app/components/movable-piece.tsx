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
import { SCALE, Piece } from './Piece'

// Spec: drag events to handle.
let sourceSpec: DragSourceSpec<MovablePieceProps> = {
  beginDrag: (props: MovablePieceProps) => ({
    name: props.piece.name,
    x: props.x,
    y: props.y,
  }),
};

interface MovablePieceProps {
  isDragging : boolean;
  connectDragSource: ConnectDragSource;
  piece: Pieces.Piece;
  x: number;
  y: number;
  rotation: number;
  selected: boolean;
}

export module MovablePiece {

  @DragSource("movable-piece", sourceSpec, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
  export class MovablePiece extends React.Component<MovablePieceProps, {}> {
    constructor(props: MovablePieceProps) {
      super(props);
    }
    render(): false | JSX.Element {
      const { x, y, rotation, selected, connectDragSource, isDragging, piece } = this.props;
      let style = {
        left: x * SCALE,
        top: y * SCALE,
      }
      return connectDragSource(
        <div className="piece-position" style={style}>
          <Piece.Piece
            key={piece.name}
            piece={piece}
            visible={!isDragging}
            rotation={rotation}
            selected={selected}
          />
        </div>
      );
    }
  }

}
