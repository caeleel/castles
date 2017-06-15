import * as React from "react";

import Pieces from '../../../lib/pieces';
import Players from '../../../lib/players';
import { Piece } from "./Piece";
import { ActivePiece } from "./active-piece";

export interface DataProps {
  pieceMap: Pieces.PieceMap;
  player: Players.Player;
}

export interface EventHandlerProps {
  onMoveActivePiece: (playerName: string, x: number, y: number) => void;
  onRotateActivePiece: (playerName: string) => void;
}

export type BoardProps = DataProps & EventHandlerProps;

// 'BoardProps' descrkibes the shape of props.
export class Board extends React.Component<BoardProps, undefined> {
  render() {
    let boardProps = this.props;
    return (
      <div className="board" onClick={(e) => this.props.onMoveActivePiece(this.props.player.name, e.nativeEvent.offsetX, e.nativeEvent.offsetY)}>
        {
          this.props.player.pieces.map(function(piece: Pieces.PiecePlacement){return (
            <Piece.Piece
              key={piece.name}
              piece={boardProps.pieceMap[piece.name]}
              x={piece.x}
              y={piece.y}
              selected={false}
              onClick={() => {}}
              rotation={piece.rotation}
            />
          );})
        }
        {boardProps.player.selectedPiece.name != "" &&
          <ActivePiece.ActivePiece
            piece={boardProps.pieceMap[boardProps.player.selectedPiece.name]}
            x={boardProps.player.selectedPiece.x}
            y={boardProps.player.selectedPiece.y}
            rotation={0}
          />
        }
      </div>
    );
  }
}
