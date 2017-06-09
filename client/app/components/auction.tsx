import * as React from "react";

import Pieces from '../../../lib/pieces';
import { AuctionPiece } from '../reducers/auction';
import { Piece } from "./Piece";


export interface DataProps {
    pieces: Array<AuctionPiece>;
    selectedId: string;
    pieceMap: Pieces.PieceMap;
    pricing: boolean;
}

export interface EventHandlerProps {
    swapWithFront: (index: number) => void;
    continueClick: () => void;
    setSelectedIndex: (index: number) => void;
}

export type AuctionProps = DataProps & EventHandlerProps;

export interface AuctionState {
}

// 'AuctionProps' describes the shape of props.
export class Auction extends React.Component<AuctionProps, AuctionState> {
    render() {
        let auctionProps = this.props;
        return (
            <div>
                <div>
                    {
                        this.props.pieces.map(function(piece, i: number){return (
                            <Piece.Piece
                                key={i}
                                piece={auctionProps.pieceMap[piece.pieceName]}
                                x={i * 200}
                                y={0}
                                selected={auctionProps.selectedId == i.toString()}
                                onClick={() => { auctionProps.pricing ? auctionProps.swapWithFront(i) : auctionProps.setSelectedIndex(i) }} />
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
