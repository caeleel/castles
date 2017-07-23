import * as React from "react";
import { findDOMNode } from 'react-dom';
import Pieces from '../lib/pieces';
import { Piece } from "./Piece";
import { Score } from "../lib/score";
import { BoardState } from '../reducers/board';
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
  board: BoardState;
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

interface State {
  offsetX: number;
  offsetY: number;
  initialOffsetX: number;
  initialOffsetY: number;
  zoomScale: number;
  currentPinchDistance?: number;
  currentMidpoint?: number[];
}

let sourceSpec: DragSourceSpec<BoardProps> = {
  beginDrag: (props: BoardProps, monitor: DragSourceMonitor, component: Board) => (component.state)
};

let targetSpec: DropTargetSpec<BoardProps> = {
  hover: (props: BoardProps, monitor: DropTargetMonitor, component: Board) => {
    let item = (monitor.getItem() as any);

    if (isNaN(item.id)) { // Board dragging
      const delta = monitor.getDifferenceFromInitialOffset();

      const offsetX = component.state.initialOffsetX + delta.x;
      const offsetY = component.state.initialOffsetY + delta.y;

      component.setState({
        offsetX: offsetX,
        offsetY: offsetY,
      })
    } else { // Piece hover
      const delta = monitor.getDifferenceFromInitialOffset();

      const offsetX = monitor.getInitialSourceClientOffset().x - component.state.offsetX;
      const offsetY = monitor.getInitialSourceClientOffset().y - component.state.offsetY;

      let left = Math.round((delta.x + offsetX) / component.state.zoomScale / 2) * 2;
      let top = Math.round((delta.y + offsetY) / component.state.zoomScale / 2) * 2;

      const piece = props.board.pieces[item.id];
      if (piece.x != left || piece.y != top) props.movePiece(item.id, left, top);
      if (props.board.selectedPieceId != item.id) props.selectPiece(item.id);
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
export class Board extends React.Component<BoardProps, State> {
  constructor() {
    super();
    let x = document.body.clientWidth / 2 - 60;
    let y = document.body.clientHeight / 2 - 60;
    this.state = {
      offsetX: x,
      offsetY: y,
      initialOffsetX: x,
      initialOffsetY: y,
      zoomScale: 20,
    }
  }

  render(): JSX.Element | false {
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
    let { board, connectDragSource, connectDropTarget, movePiece, selectPiece, pieceScores } = this.props;


    let touchEnd = (e: TouchEvent) => {
      this.setState({currentPinchDistance: null, currentMidpoint: null})
    }

    let touchMove = (e: TouchEvent) => {
      if (e.touches.length != 2) {
        return;
      }
      let d = Math.sqrt(
        Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
        Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
      )
      let currentMidpoint = [
        (e.touches[0].clientX + e.touches[1].clientX) / 2,
        (e.touches[0].clientY + e.touches[1].clientY) / 2,
      ]
      if (this.state.currentPinchDistance && this.state.currentMidpoint) {
        zoom(currentMidpoint[0], currentMidpoint[1], d / this.state.currentPinchDistance - 1)
      }
      this.setState({currentPinchDistance: d, currentMidpoint: currentMidpoint})

      e.preventDefault() // prevent iOS overscrolling
    }

    let zoom = (x: number, y: number, delta: number) => {
      this.setState({zoomScale: this.state.zoomScale * (1 + delta)});

      let offsetX = this.state.offsetX + (this.state.offsetX - x) * delta;
      let offsetY = this.state.offsetY + (this.state.offsetY - y) * delta;
      this.setState({offsetX: offsetX, offsetY: offsetY});
    }

    let wheel = (e: WheelEvent) => {
      zoom(e.clientX, e.clientY, -(e.deltaY / 100));
    }

    return connectDragSource(connectDropTarget(
      <div
        className="board"
        onClick={() => { selectPiece(-1) }}
        onTouchEnd={touchEnd.bind(this)}
        onTouchMove={touchMove.bind(this)}
        onWheel={wheel.bind(this)}
      >
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
              zoomScale={this.state.zoomScale}
            />
          ))
        }
      </div>
    ));
  }
}
