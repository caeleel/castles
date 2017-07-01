import * as React from "react";

import Pieces from '../../../lib/pieces';
import Players from '../../../lib/players';
import { AuctionPiece } from '../reducers/auction';
import { SortablePiece } from './sortable-piece';
import { MovablePiece } from './movable-piece';
import { Piece } from "./Piece";


export interface DataProps {
  player: Players.Player;
  pieceNames: Array<AuctionPiece>;
  pieceMap: Pieces.PieceMap;
  pricing: boolean;
}

export interface EventHandlerProps {
  swapPieces: (i: number, j: number) => void;
  setSelectedIndex: (playerName: string, pieceNames: Array<AuctionPiece>, index: number) => void;
}

export type AuctionProps = DataProps & EventHandlerProps;

export class Auction extends React.Component<AuctionProps, undefined> {
  pieces() {
    let { pieceMap, player, swapPieces, pieceNames, setSelectedIndex } = this.props;
    if (this.props.pricing) {
      return (
        this.props.pieceNames.map(function(piece, i: number) {return (
          <SortablePiece.SortablePiece
            key={piece.pieceName}
            piece={pieceMap[piece.pieceName]}
            index={i}
            setSelectedIndex={setSelectedIndex}
            swapPieces={swapPieces}
            isDragging={false}
            connectDragSource={null}
            connectDropTarget={null}
            // TODO: learn how to pass props into reducers via ownProps and stop passing these to the child
            player={player}
            pieceNames={pieceNames}
           />
        );})
      )
    } else {
      return (
        this.props.pieceNames.map(function(piece, i: number) { return (
          <MovablePiece.MovablePiece
            key={piece.pieceName}
            piece={pieceMap[piece.pieceName]}
            isDragging={false}
            x={i * 200}
            y={0}
            rotation={0}
            connectDragSource={null}
            selected={player.selectedPiece && player.selectedPiece.name === piece.pieceName}
           />
        );})
      )
    }
  }

  render() {
    return (
      <div className="auction">
        {this.props.player.name}: {this.props.player.score}
        <div className="pieces">
          {this.pieces()}
        </div>
      </div>
    );
  }
}
