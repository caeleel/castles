import * as React from "react";

import Pieces from '../../../lib/pieces';
import Players from '../../../lib/players';
import { Piece } from "./Piece";
import { ActivePiece } from "./active-piece";
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

export interface DataProps {
  pieceMap: Pieces.PieceMap;
  player: Players.Player;
}

export interface EventHandlerProps {
  onMoveActivePiece: (playerName: string, x: number, y: number) => void;
  onRotateActivePiece: (playerName: string) => void;
  connectDropTarget: ConnectDropTarget;
}

export type BoardProps = DataProps & EventHandlerProps;

let targetSpec: DropTargetSpec<BoardProps> = {
  drop: (props: BoardProps, monitor: DropTargetMonitor, component: Board) => {
    let item = (monitor.getItem() as any);
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.x + delta.x);
    const top = Math.round(item.x + delta.y);

    console.log(left)
    console.log(top)
    props.onMoveActivePiece(props.player.name, left, top);
  }
}

@DropTarget('active-piece', targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
}))
export class Board extends React.Component<BoardProps, undefined> {
  render(): JSX.Element | false {
    let { pieceMap, player, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="board">
        {
          this.props.player.pieces.map(function(piece: Pieces.PiecePlacement){return (
            <Piece.Piece
              key={piece.name}
              piece={pieceMap[piece.name]}
              x={piece.x}
              y={piece.y}
              selected={false}
              rotation={piece.rotation}
              visible={true}
            />
          );})
        }
        {player.selectedPiece.name != "" &&
          <ActivePiece.ActivePiece
            piece={pieceMap[player.selectedPiece.name]}
            x={player.selectedPiece.x}
            y={player.selectedPiece.y}
            rotation={0}
            isDragging={false}
            connectDragSource={null}
          />
        }
      </div>
    );
  }
}
