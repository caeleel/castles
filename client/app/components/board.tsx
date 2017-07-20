import * as React from "react";
import { findDOMNode } from 'react-dom';
import Pieces from '../../../lib/pieces';
import { Piece, SCALE } from "./Piece";
import { Score } from "../../../lib/score";
import { BoardState as BoardReducerState } from '../reducers/board';
import {
  DragDropContext,
  ConnectDropTarget,
  ConnectDragSource,
  ConnectDragPreview,
  DragSource,
  DragSourceSpec,
  DragSourceCollector,
  DragSourceConnector,
  DragSourceMonitor,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export interface PublicProps {
  pieceScores: Score.PieceScores;
}

export interface DataProps {
  board: BoardReducerState;
}

export interface EventHandlerProps {
  movePiece(id: number, x: number, y: number): void;
  selectPiece(id: number): void;
}

interface DragAndDropHandlerProps {
  connectDropTarget: ConnectDropTarget;
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

export type BoardProps = PublicProps & DataProps & EventHandlerProps & DragAndDropHandlerProps;

interface BoardState {
  offsetX: number;
  offsetY: number;
  initialOffsetX: number;
  initialOffsetY: number;
}

let sourceSpec: DragSourceSpec<BoardProps> = {
  beginDrag: (props: BoardProps, monitor: DragSourceMonitor, component: Board) => (component.state)
};

let targetSpec: DropTargetSpec<BoardProps> = {
  hover: (props: BoardProps, monitor: DropTargetMonitor, component: Board) => {
    let item = (monitor.getItem() as any);
    if (item.id) {
      const delta = monitor.getDifferenceFromInitialOffset();

      const offsetX = monitor.getInitialSourceClientOffset().x - component.state.offsetX;
      const offsetY = monitor.getInitialSourceClientOffset().y - component.state.offsetY;

      let left = Math.round((delta.x + offsetX) / SCALE / 2) * 2;
      let top = Math.round((delta.y + offsetY) / SCALE / 2) * 2;

      props.movePiece(item.id, left, top);
      props.selectPiece(item.id);
    } else {
      const delta = monitor.getDifferenceFromInitialOffset();

      const offsetX = component.state.initialOffsetX + delta.x;
      const offsetY = component.state.initialOffsetY + delta.y;

      component.setState({
        offsetX: offsetX,
        offsetY: offsetY,
      })
    }
  },
  drop: (props: BoardProps, monitor: DropTargetMonitor, component: Board) => {
    component.setState({initialOffsetX: component.state.offsetX, initialOffsetY: component.state.offsetY});
  }

}

@DragSource("board", sourceSpec, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
@DropTarget(['board', 'piece'], targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
}))
export class Board extends React.Component<BoardProps, BoardState> {
  constructor() {
    super();
    let x = document.body.clientWidth / 2 - 30;
    let y = document.body.clientHeight / 2 - 30;
    this.state = {
      offsetX: x,
      offsetY: y,
      initialOffsetX: x,
      initialOffsetY: y,
    }
  }

  render(): JSX.Element | false {
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
    let { board, connectDragSource, connectDropTarget, movePiece, selectPiece, pieceScores } = this.props;
    return connectDragSource(connectDropTarget(
      <div className="board" onClick={() => { selectPiece(-1) }}>
        {
          board.pieceIds.map((index: number) => (
            <Piece.Piece
              key={index + JSON.stringify(board.pieces[index])}
              id={index}
              piece={board.pieces[index]}
              offsetX={this.state.offsetX}
              offsetY={this.state.offsetY}
              isDragging={false}
              connectDragSource={null}
              connectDragPreview={null}
              selectPiece={selectPiece}
              selected={board.selectedPieceId == index}
              scorable={typeof pieceScores[index] === 'number'}
              score={pieceScores[index]}
            />
          ))
        }
      </div>
    ));
  }
}
