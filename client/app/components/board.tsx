import * as React from "react";
import { findDOMNode } from 'react-dom';
import Pieces from '../../../lib/pieces';
import { Piece, SCALE } from "./Piece";
import { Score } from "../../../lib/score";
import { BoardState as BoardReducerState } from '../reducers/board';
import {
  DragDropContext,
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec } from 'react-dnd';

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
}

export type BoardProps = PublicProps & DataProps & EventHandlerProps & DragAndDropHandlerProps;

interface BoardState {
  offsetX: number;
  offsetY: number;
}

let targetSpec: DropTargetSpec<BoardProps> = {
  hover: (props: BoardProps, monitor: DropTargetMonitor, component: Board) => {
    let item = (monitor.getItem() as any);
    const delta = monitor.getDifferenceFromInitialOffset();

    // const boardBoundingRect = findDOMNode(component).getBoundingClientRect();
    const offsetX = monitor.getInitialSourceClientOffset().x - component.state.offsetX;
    const offsetY = monitor.getInitialSourceClientOffset().y - component.state.offsetY;

    let left = Math.round((delta.x + offsetX) / SCALE / 2) * 2;
    let top = Math.round((delta.y + offsetY) / SCALE / 2) * 2;

    props.movePiece(item.id, left, top);
    props.selectPiece(item.id);
  }

}

@DropTarget('piece', targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
}))
export class Board extends React.Component<BoardProps, BoardState> {
  constructor() {
    super();
    this.state = {
      offsetX: document.body.clientWidth / 2 - 30,
      offsetY: document.body.clientHeight / 2 - 30,
    }
  }

  render(): JSX.Element | false {
    let { board, connectDropTarget, movePiece, selectPiece, pieceScores } = this.props;
    return connectDropTarget(
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
    );
  }
}
