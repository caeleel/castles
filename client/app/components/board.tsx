import * as React from "react";

import Pieces from '../../../lib/pieces';
import { Piece } from "./Piece";
import { ActivePiece } from "./active-piece";

export interface DataProps {
  currentPlayerName: string;
  pieces: Array<Pieces.PiecePlacement>;
  selectedPieceName: string;
  pieceMap: Pieces.PieceMap;
  selectedPieceX: number;
  selectedPieceY: number;
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
    console.log(boardProps.selectedPieceName)
    return (
      <div className="board" onClick={(e) => this.props.onMoveActivePiece(this.props.currentPlayerName, e.nativeEvent.offsetX, e.nativeEvent.offsetY)}>
        {
          this.props.pieces.map(function(piece: Pieces.PiecePlacement, i: number){return (
            <Piece.Piece
              key={i}
              piece={boardProps.pieceMap[piece.name]}
              x={piece.x}
              y={piece.y}
              selected={false}
              onClick={() => {}}
              rotation={piece.rotation}
            />
          );})
        }
        {boardProps.selectedPieceName != "" &&
          <ActivePiece.ActivePiece
            piece={boardProps.pieceMap[boardProps.selectedPieceName]}
            x={boardProps.selectedPieceX}
            y={boardProps.selectedPieceY}
            rotation={0}
          />
        }
      </div>
    );
  }
}
