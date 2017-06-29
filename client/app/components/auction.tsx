import * as React from "react";

import Pieces from '../../../lib/pieces';
import Players from '../../../lib/players';
import { AuctionPiece } from '../reducers/auction';
import { AuctionPiece as AuctionPieceComponent } from './auction-piece';
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
  continueClick: () => void;
}

export type AuctionProps = DataProps & EventHandlerProps;

export class Auction extends React.Component<AuctionProps, undefined> {
  render() {
    let { pieceMap, player, swapPieces, pieceNames, setSelectedIndex } = this.props;
    return (
      <div className="auction">
        {this.props.player.name}: {this.props.player.score}
        <div className="pieces">
          {
            this.props.pieceNames.map(function(piece, i: number){return (
              <AuctionPieceComponent.AuctionPiece
                key={piece.pieceName}
                piece={pieceMap[piece.pieceName]}
                index={i}
                x={i * 200}
                y={0}
                rotation={0}
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
          }
        </div>
        <div>
          <button className="continue" onClick={this.props.continueClick}>Continue</button>
        </div>
      </div>
    );
  }
}
