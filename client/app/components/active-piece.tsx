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
import { findDOMNode } from 'react-dom';
import Pieces from '../../../lib/pieces';
import { Piece } from './Piece'

// Spec: drag events to handle.
let sourceSpec: DragSourceSpec<ActivePiece.ActivePieceProps> = {
  beginDrag: (props: ActivePiece.ActivePieceProps) => ({
    x: props.x,
    y: props.y,
  }),
};

export module ActivePiece {
  export interface ActivePieceProps {
    isDragging : boolean;
    connectDragSource: ConnectDragSource;
    piece: Pieces.Piece;
    x: number;
    y: number;
    rotation: number;
  }

  export interface Test{}

  @DragSource("active-piece", sourceSpec, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
  export class ActivePiece extends React.Component<ActivePieceProps, Test> {
    constructor(props: ActivePieceProps) {
      super(props);
    }
    render(): false | JSX.Element {
      const { x, y, connectDragSource, isDragging, piece } = this.props;

      return connectDragSource(
        <div>
          <Piece.Piece
            key={piece.name}
            piece={piece}
            visible={!isDragging}
            x={x}
            y={y}
            rotation={0}
            selected={false}
          />
        </div>
      );
    }
  }

}
