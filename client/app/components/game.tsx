import * as React from "react";

import Pieces from '../../../lib/pieces';
import Players from '../../../lib/players';
import { Board } from "./board";
import AuctionContainer from '../containers/auction';
import { BoardState } from '../reducers/board'
import { State, GameState } from '../reducers/game'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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

type GameProps = DataProps & EventHandlerProps;

class Game extends React.Component<GameProps, undefined> {
  render() {
    let gameProps = this.props;
    return (
      <div>
        {this.props.game.mode == State.Placing ? "Placing" : "Pricing"}
        <AuctionContainer />
        {
          this.props.board.playerNames.map(function (playerName: string) {
            return (
              <Board
                key={playerName}
                pieceMap={gameProps.pieceMap}
                player={gameProps.board.byPlayerName[playerName]}
                onMoveActivePiece={gameProps.onMoveActivePiece}
                onRotateActivePiece={gameProps.onRotateActivePiece}
                connectDropTarget={null}
              />
             )
          })
        }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Game);

