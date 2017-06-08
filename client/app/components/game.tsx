import * as React from "react";

import Pieces from '../../../lib/pieces';
import { Piece } from "./Piece";
import AuctionContainer from '../containers/auction';

export interface DataProps {
    pieceMap: Pieces.PieceMap;
    selectedId: string;
}

export interface EventHandlerProps {
    onLoadPiecesClick: () => void;
    onPieceClick: (id: string) => void;
    onMoveClick: (x: number, y: number) => void;
}

export type GameProps = DataProps & EventHandlerProps;

export interface GameState {
}

// 'GameProps' describes the shape of props.
export class Game extends React.Component<GameProps, GameState> {
    render() {
        let onPieceClick = this.props.onPieceClick;
        let selectedId = this.props.selectedId;
        return (
            <div>
                <AuctionContainer />
            </div>
        );
        // return (
        //     <div>
        //         <AuctionContainer />
        //         <div onClick={(e) => this.props.onMoveClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}>
        //             <button onClick={this.props.onLoadPiecesClick} />
        //             {
        //                 this.props.pieces.map(function(piece, i: number){return (
        //                     <Piece.Piece key={i} piece={piece} x={0} y={0} selected={selectedId == i.toString()} onClick={() => onPieceClick(i.toString())} />
        //                 );})
        //             }
        //         </div>
        //     </div>
        // );
    }
}
