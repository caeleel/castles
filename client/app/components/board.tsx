import * as React from "react";
import { findDOMNode } from 'react-dom';
import Pieces from '../../../lib/pieces';
import { Score } from '../../../lib/score';
import { Piece, SCALE } from "./Piece";
import { BoardState } from '../reducers/board';
import {
  DragDropContext,
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec } from 'react-dnd';

export interface DataProps {
  board: BoardState;
}

export interface EventHandlerProps {
  movePiece(id: number, x: number, y: number): void;
  rotatePiece(id: number, increment: number): void;
  selectPiece(id: number): void;
  setScore(score: number): void;
}

interface DragAndDropHandlerProps {
  connectDropTarget: ConnectDropTarget;
}

export type BoardProps = DataProps & EventHandlerProps & DragAndDropHandlerProps;

let targetSpec: DropTargetSpec<BoardProps> = {
  drop: (props: BoardProps, monitor: DropTargetMonitor, component: Board) => {
    let item = (monitor.getItem() as any);
    const delta = monitor.getDifferenceFromInitialOffset();

    const boardBoundingRect = findDOMNode(component).getBoundingClientRect();
    const xOffset = monitor.getInitialSourceClientOffset().x - boardBoundingRect.left;
    const yOffset = monitor.getInitialSourceClientOffset().y - boardBoundingRect.top;

    let left = Math.round((delta.x + xOffset) / SCALE);
    let top = Math.round((delta.y + yOffset) / SCALE);

    props.movePiece(item.id, left, top);
    props.selectPiece(item.id);

    props.setScore(Score.score(props.board.pieces, props.board.pieceIds));
  }
}

@DropTarget('piece', targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
}))
export class Board extends React.Component<BoardProps, {}> {
  render(): JSX.Element | false {
    let { board, connectDropTarget, rotatePiece, selectPiece, setScore } = this.props;
    return connectDropTarget(
      <div className="board" onClick={() => { selectPiece(-1) }}>
        {
          board.pieceIds.map((index: number) => (
            <Piece.Piece
              key={index + JSON.stringify(board.pieces[index])}
              id={index}
              piece={board.pieces[index]}
              isDragging={false}
              connectDragSource={null}
              rotatePiece={(id: number, increment: number) => {
                rotatePiece(id, increment);
                setScore(Score.score(board.pieces, board.pieceIds));
              }}
              selectPiece={selectPiece}
              selected={board.selectedPieceId == index}
            />
          ))
        }
      </div>
    );
  }
}
