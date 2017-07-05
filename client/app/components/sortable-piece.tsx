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
import Players from '../../../lib/players';
import { Piece } from './Piece'
import { AuctionPiece } from '../reducers/auction';

// Spec: drag events to handle.
let sourceSpec: DragSourceSpec<SortablePiece.SortablePieceProps> = {
  beginDrag: (props: SortablePiece.SortablePieceProps) => ({
    index: props.index,
  }),
};

let targetSpec: DropTargetSpec<SortablePiece.SortablePieceProps> = {
  hover: (props: SortablePiece.SortablePieceProps, monitor: DropTargetMonitor, component: SortablePiece.SortablePiece) => {
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

export module SortablePiece {
  export interface SortablePieceProps {
    isDragging : boolean;
    connectDragSource: ConnectDragSource;
    connectDropTarget: ConnectDropTarget;
    piece: Pieces.Piece;
    index: number;
    swapPieces: (i: number, j: number) => void;
    setSelectedIndex: (playerName: string, pieceNames: Array<AuctionPiece>, index: number) => void;
    player: Players.Player;
    pieceNames: Array<AuctionPiece>;
  }

  @DragSource("sortable-piece", sourceSpec, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
  @DropTarget("sortable-piece", targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
  }))
  export class SortablePiece extends React.Component<SortablePieceProps, {}> {
    render(): JSX.Element | false {
      const { connectDragSource, connectDropTarget, isDragging, index, piece, setSelectedIndex, player, pieceNames } = this.props;
      let style = {
        x: index * 200,
        y: 0
      }

      return connectDragSource(connectDropTarget(
        <div
          className="slot"
          // onClick={() => setSelectedIndex(player.name, pieceNames, index)}
          style={style}
        >
          <Piece.Piece
            key={piece.name}
            piece={piece}
            visible={!isDragging}
            rotation={0}
            selected={false}
          />
        </div>
      ), {dropEffect: 'move'});
    }
  }

}
