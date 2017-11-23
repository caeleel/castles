import * as React from "react";
import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  DragDropContext,
  DragSource,
  DragSourceCollector,
  DragSourceConnector,
  DragSourceMonitor,
  DragSourceSpec,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { findDOMNode } from "react-dom";
import Pieces from "../lib/pieces";
import { Score } from "../lib/score";
import { UrlPieceEncoding } from "../lib/url_piece_encoding";
import { BoardState } from "../reducers/board";
import { Piece } from "./Piece";

export interface DataProps {
  pieceScores: Score.PieceScores;
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

export type BoardProps = DataProps & EventHandlerProps & DragAndDropHandlerProps;

interface State {
  offsetX: number;
  offsetY: number;
  initialOffsetX: number;
  initialOffsetY: number;
  zoomScale: number;
  currentPinchDistance?: number;
  currentMidpoint?: number[];
  shouldBeUpdatingUrlHash: boolean;
  isCurrentlyTwoFingerPinching: boolean;
}

const sourceSpec: DragSourceSpec<BoardProps> = {
  beginDrag: (props: BoardProps, monitor: DragSourceMonitor, component: Board) => (component.state),
};

const targetSpec: DropTargetSpec<BoardProps> = {
  hover: (props: BoardProps, monitor: DropTargetMonitor, component: Board) => {
    const item = (monitor.getItem() as any);
    if (component.state.isCurrentlyTwoFingerPinching) {
      return;
    }
    component.setState({shouldBeUpdatingUrlHash: false});

    if (isNaN(item.id)) { // Board dragging
      const delta = monitor.getDifferenceFromInitialOffset();

      const offsetX = component.state.initialOffsetX + delta.x;
      const offsetY = component.state.initialOffsetY + delta.y;

      component.setState({
        offsetX,
        offsetY,
      });
    } else { // Piece hover
      const delta = monitor.getDifferenceFromInitialOffset();

      const offsetX = monitor.getInitialSourceClientOffset().x - component.state.offsetX;
      const offsetY = monitor.getInitialSourceClientOffset().y - component.state.offsetY;

      const left = Math.round((delta.x + offsetX) / component.state.zoomScale / 2) * 2;
      const top = Math.round((delta.y + offsetY) / component.state.zoomScale / 2) * 2;

      const piece = props.board.pieces[item.id];
      if (piece.x != left || piece.y != top) { props.movePiece(item.id, left, top); }
      if (props.board.selectedPieceId != item.id) { props.selectPiece(item.id); }
    }
  },
  drop: (props: BoardProps, monitor: DropTargetMonitor, component: Board) => {
    component.setState({shouldBeUpdatingUrlHash: true, initialOffsetX: component.state.offsetX, initialOffsetY: component.state.offsetY});
  },
};

@DragSource("board", sourceSpec, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
@DropTarget(["board", "piece"], targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
}))
export class Board extends React.PureComponent<BoardProps, State> {
  constructor() {
    super();
    const x = document.body.clientWidth / 2 - 60;
    const y = document.body.clientHeight / 2 - 60;
    this.state = {
      offsetX: x,
      offsetY: y,
      initialOffsetX: x,
      initialOffsetY: y,
      zoomScale: 20,
      shouldBeUpdatingUrlHash: false,
      isCurrentlyTwoFingerPinching: false,
    };
  }

  public render(): JSX.Element | false {
    if (this.state.shouldBeUpdatingUrlHash) {
      window.location.hash = UrlPieceEncoding.encodePieces(this.props.board.pieces, this.props.board.pieceIds);
    }

    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
    const { board, connectDragSource, connectDropTarget, movePiece, selectPiece, pieceScores } = this.props;

    const touchEnd = (e: TouchEvent) => {
      this.setState({currentPinchDistance: null, currentMidpoint: null, isCurrentlyTwoFingerPinching: false});
    };

    const touchMove = (e: TouchEvent) => {
      if (e.touches.length != 2) {
        return;
      }
      const d = Math.sqrt(
        Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
        Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2),
      );
      const currentMidpoint = [
        (e.touches[0].clientX + e.touches[1].clientX) / 2,
        (e.touches[0].clientY + e.touches[1].clientY) / 2,
      ];
      if (this.state.currentPinchDistance && this.state.currentMidpoint) {
        zoom(currentMidpoint[0], currentMidpoint[1], d / this.state.currentPinchDistance - 1);
      }
      this.setState({currentPinchDistance: d, currentMidpoint, isCurrentlyTwoFingerPinching: true});

      e.preventDefault(); // prevent iOS overscrolling
    };

    const zoom = (x: number, y: number, delta: number) => {

      const offsetX = this.state.offsetX + (this.state.offsetX - x) * delta;
      const offsetY = this.state.offsetY + (this.state.offsetY - y) * delta;
      const newZoom = this.state.zoomScale * (1 + delta);

      if (newZoom < 5 || newZoom > 50) { return; }

      this.setState({
        offsetX,
        offsetY,
        initialOffsetX: offsetX,
        initialOffsetY: offsetY,
        zoomScale: newZoom,
      });
    };

    const wheel = (e: WheelEvent) => {
      let dy = -e.deltaY / 100;
      if (navigator.platform == "Win32") { dy /= 8; }
      zoom(e.clientX, e.clientY, dy);
    };

    return connectDragSource(connectDropTarget(
      <div
        className="board"
        onClick={() => { selectPiece(-1); }}
        onTouchEnd={touchEnd.bind(this)}
        onTouchMove={touchMove.bind(this)}
        onWheel={wheel.bind(this)}
      >
        <div className="piece-offset" style={{left: this.state.offsetX, top: this.state.offsetY}}>
          {
            board.pieceIds.map((index: number) => (
              <Piece.Piece
                key={index + JSON.stringify(board.pieces[index])}
                id={index}
                piece={board.pieces[index]}
                isDragging={false}
                connectDragSource={null}
                connectDragPreview={null}
                selectPiece={selectPiece}
                selected={board.selectedPieceId == index}
                scorable={typeof pieceScores[index] === "number"}
                score={pieceScores[index]}
                zoomScale={this.state.zoomScale}
              />
            ))
          }
         </div>
      </div>,
    ));
  }
}
