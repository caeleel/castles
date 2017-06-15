import * as React from "react";

import Pieces from '../../../lib/pieces';
import { AuctionPiece } from '../reducers/auction';
import { Piece } from "./Piece";


export interface DataProps {
  playerName: string;
  pieceNames: Array<AuctionPiece>;
  selectedPieceName: string;
  pieceMap: Pieces.PieceMap;
  pricing: boolean;
}

export interface EventHandlerProps {
  swapWithFront: (index: number) => void;
  setSelectedIndex: (playerName: string, pieceNames: Array<AuctionPiece>, index: number) => void;
  continueClick: () => void;
}

export type AuctionProps = DataProps & EventHandlerProps;

export class Auction extends React.Component<AuctionProps, undefined> {
  render() {
    let auctionProps = this.props;
    return (
      <div className="auction">
        {this.props.playerName}
        <div className="pieces">
          {
            this.props.pieceNames.map(function(piece, i: number){return (
              <Piece.Piece
                key={piece.pieceName}
                piece={auctionProps.pieceMap[piece.pieceName]}
                x={i * 200}
                y={0}
                rotation={0}
                selected={auctionProps.selectedPieceName == i.toString()}
                onClick={() => { auctionProps.pricing ? auctionProps.swapWithFront(i) : auctionProps.setSelectedIndex(auctionProps.playerName, auctionProps.pieceNames, i) }} />
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
