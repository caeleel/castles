import * as React from "react";

import Pieces from '../../../lib/pieces';
import { AuctionPiece } from '../reducers/auction';
import { Piece } from "./Piece";


export interface DataProps {
    pieces: Array<AuctionPiece>;
    selectedId: string;
    pieceMap: Pieces.PieceMap;
}

export interface EventHandlerProps {
    swapWithFront: (index: number) => void;
}

export type AuctionProps = DataProps & EventHandlerProps;

export interface AuctionState {
}

// 'AuctionProps' describes the shape of props.
export class Auction extends React.Component<AuctionProps, AuctionState> {
    render() {
        let swapWithFront = this.props.swapWithFront;
        let selectedId = this.props.selectedId;
        let pieceMap = this.props.pieceMap;
        return (
            <div>
                {
                    this.props.pieces.map(function(piece, i: number){return (
                        <Piece.Piece key={i} piece={pieceMap[piece.pieceName]} x={0} y={0} selected={selectedId == i.toString()} onClick={() => swapWithFront(i)} />
                    );})
                }
            </div>
        );
    }
}
