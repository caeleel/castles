import * as React from "react";

import Pieces from '../../../lib/pieces';
import Players from '../../../lib/players';
import { Board } from "./board";
import AuctionContainer from '../containers/auction';
import { BoardState } from '../reducers/board'
import { State, GameState } from '../reducers/game'

export interface DataProps {
  board: BoardState;
  game: GameState;
  pieceMap: Pieces.PieceMap;
}

export interface EventHandlerProps {
  onLoadPiecesClick: () => void;
  onMoveActivePiece(playerName: string, x: number, y: number): void;
  onRotateActivePiece(playerName: string): void;
}

export type GameProps = DataProps & EventHandlerProps;

// 'GameProps' describes the shape of props.
export class Game extends React.Component<GameProps, undefined> {
  render() {
    let gameProps = this.props;
    return (
      <div>
        {this.props.game.mode == State.Placing ? "Placing" : "Pricing"}
        <AuctionContainer />
        {
          this.props.board.playerNames.map(function (playerName: string, i: number) {
            let player = gameProps.board.byPlayerName[playerName];
              <Board
                key={i}
                currentPlayerName={playerName}
                pieces={player.pieces}
                selectedPieceName={player.selectedPiece.name}
                pieceMap={gameProps.pieceMap}
                selectedPieceX={player.selectedPiece.x}
                selectedPieceY={player.selectedPiece.x}
                onMoveActivePiece={gameProps.onMoveActivePiece}
                onRotateActivePiece={gameProps.onRotateActivePiece}
              />
          })
        }
      </div>
    );
  }
}
