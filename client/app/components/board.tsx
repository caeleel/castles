import * as React from "react";

import { Pieces } from '../../../lib/pieces';
import { Piece } from "./Piece";

export interface BoardProps { compiler: string; framework: string; }


export interface BoardState {
  pieces: Array<Pieces.Piece>;
}

// 'BoardProps' describes the shape of props.
export class Board extends React.Component<BoardProps, BoardState> {

    componentWillMount() {
        let lol: Array<Pieces.Piece> = []
        this.setState({pieces: lol})
        Pieces.loadPieces().then((pieces : Pieces.Piece[]) => {
          this.setState({pieces: pieces});
        }).catch(err => {
          console.log(err);
        })
    }

    render() {
        console.log(this.state.pieces)
        return (
            <div>
                {
                    this.state.pieces.map(function(piece, i: number){return (
                        <Piece.Piece key={i} piece={piece} />
                    );})
                }
            </div>
        );

    }
}
