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
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ClientOffset,
  DropTargetSpec } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import Pieces from '../../../lib/pieces';
import { Piece } from './Piece'
import { AuctionPiece as AuctionPieceData } from '../reducers/auction';

// Spec: drag events to handle.
let sourceSpec: DragSourceSpec<AuctionPiece.AuctionPieceProps> = {
  beginDrag: (props: AuctionPiece.AuctionPieceProps) => ({
    index: props.index,
  }),
};

let targetSpec: DropTargetSpec<AuctionPiece.AuctionPieceProps> = {
  hover: (props: AuctionPiece.AuctionPieceProps, monitor: DropTargetMonitor, component: AuctionPiece.AuctionPiece) => {
    let node = (monitor.getItem() as any);
    const dragIndex = node.index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items width
    // When dragging leftwards, only move when the cursor is passed 50%
    // When dragging rightwards, only move when the cursor is passed 50%

    // Dragging leftwards
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    // Dragging rightwards
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    // Time to actually perform the action
    props.swapPieces(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    node = (monitor.getItem() as any);
    node.index = hoverIndex;
  }
}

export module AuctionPiece {
  export interface AuctionPieceProps {
    isDragging : boolean;
    connectDragSource: ConnectDragSource;
    connectDropTarget: ConnectDropTarget;
    piece: Pieces.Piece;
    index: number;
    x: number;
    y: number;
    rotation: number;
    selected: boolean;
    swapPieces: (i: number, j: number) => void;
    setSelectedIndex: (playerName: string, pieceNames: Array<AuctionPieceData>, index: number) => void;
  }

  export interface Test{}

  @DragSource("auction-piece", sourceSpec, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
  @DropTarget("auction-piece", targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
  }))
  export class AuctionPiece extends React.Component<AuctionPieceProps, Test> {
    render(): JSX.Element | false {
      const { connectDragSource, connectDropTarget, isDragging, index, piece, selected } = this.props;

      return connectDragSource(connectDropTarget(
        <div>
          <Piece.Piece
            key={piece.name}
            piece={piece}
            visible={!isDragging}
            x={index * 200}
            y={0}
            rotation={0}
            selected={selected}
          />
        </div>
      ));
    }
  }

}
