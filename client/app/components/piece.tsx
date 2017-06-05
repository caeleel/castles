import * as React from "react";

import Pieces from '../../../lib/pieces';

interface Position {
    x: number;
    y: number;
}

export interface PieceState {
  x: number;
  y: number;
}

const SCALE = 20;

export module Piece {
    export interface PieceProps { piece: Pieces.Piece, x: number, y: number, selected: boolean, onClick: () => void; }

    // 'PieceProps' describes the shape of props.
    // State is never set so we use the 'undefined' type.
    export class Piece extends React.Component<PieceProps, PieceState> {
        componentWillMount() {
            this.setState({x: this.props.piece.x, y: this.props.piece.y});
        }

        handleClick() {
            this.props.onClick()
            //this.setState({x: this.state.x + 100})
        }

        classNames() {
            return "piece " + (this.props.piece.type) + " " + (this.props.selected ? "selected" : "")
        }

        render() {
            let style = {
                left: this.props.x,
                top: this.props.y,
                height: this.props.piece.height * SCALE,
                width: this.props.piece.width * SCALE
            };

            if (this.props.selected) {
                console.log("i am here")
            }

            return <div onClick={() => this.handleClick()} className={this.classNames()} style={style}>
                {this.props.piece.name}
            </div>;
        }
    }
}
