import * as React from "react";

import Pieces from '../../../lib/pieces';
import { Piece } from "./Piece";


export interface DataProps {
    pieces: Array<Pieces.Piece>;
    selectedId: string;
}

export interface EventHandlerProps {
    onLoadPiecesClick: () => void;
    onPieceClick: (id: string) => void;
}

export type BoardProps = DataProps & EventHandlerProps;

export interface BoardState {
}

// 'BoardProps' describes the shape of props.
export class Board extends React.Component<BoardProps, BoardState> {
    render() {
        let onPieceClick = this.props.onPieceClick;
        return (
            <div>
                <button onClick={this.props.onLoadPiecesClick} />
                {
                    this.props.pieces.map(function(piece, i: number){return (
                        <Piece.Piece key={i} piece={piece} onClick={() => onPieceClick(i.toString())} />
                    );})
                }
            </div>
        );
    }
}
