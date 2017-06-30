import * as React from "react";
import { findDOMNode } from 'react-dom';
import Pieces from '../../../lib/pieces';
import Players from '../../../lib/players';
import { Piece } from "./Piece";
import { MovablePiece } from "./movable-piece";
import {
  DragDropContext,
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec } from 'react-dnd';

export interface DataProps {
  pieceMap: Pieces.PieceMap;
  player: Players.Player;
}

export interface EventHandlerProps {
  movePiece: (pieceName: string, playerName: string, x: number, y: number) => void;
  rotateSelectedLeft(playerName: string): void;
  rotateSelectedRight(playerName: string): void;
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

    const left = Math.round(delta.x + xOffset);
    const top = Math.round(delta.y + yOffset);

    props.movePiece(item.name, props.player.name, left, top);
  }
}

@DropTarget('movable-piece', targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
}))
export class Board extends React.Component<BoardProps, undefined> {
  render(): JSX.Element | false {
    let { pieceMap, player, connectDropTarget, rotateSelectedLeft, rotateSelectedRight } = this.props;
    return connectDropTarget(
      <div className="board">
        {
          this.props.player.pieces.map(function(piece: Pieces.PiecePlacement){
            let style = {
              left: piece.x,
              top: piece.y,
            };
            return (
              <div key={piece.name} className="piece-position" style={style}>
                <Piece.Piece
                  piece={pieceMap[piece.name]}
                  selected={false}
                  rotation={piece.rotation}
                  visible={true}
                />
              </div>
          );})
        }

        {this.props.player.selectedPiece && (
          <div>
            <button onClick={() => { rotateSelectedLeft(player.name); }}>Rotate left</button>
            <MovablePiece.MovablePiece
              piece={pieceMap[player.selectedPiece.name]}
              x={player.selectedPiece.x}
              y={player.selectedPiece.y}
              rotation={0}
              isDragging={false}
              connectDragSource={null}
            />
            <button onClick={() => { rotateSelectedRight(this.props.player.name); }}>Rotate right</button>
          </div>
        )}
      </div>
    );
  }
}
