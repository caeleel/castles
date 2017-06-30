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
  onLoadPiecesClick(): void;
  onMoveActivePiece(playerName: string, x: number, y: number): void;
  onRotateActivePiece(playerName: string): void;
  continueClick(board: BoardState, game: GameState, pieces: Pieces.PieceMap): void;
}

type GameProps = DataProps & EventHandlerProps;

class Game extends React.Component<GameProps, undefined> {

  stateTooltip = function () {
    switch (this.props.game.mode) {
      case State.Placing:
        return "Please pick a piece to add to your castle.";
      case State.Pricing:
        return "Drag pieces around to decide on a pricing";
    }
  }
  render() {
    let { board, game, pieceMap, onLoadPiecesClick, onMoveActivePiece, onRotateActivePiece, continueClick } = this.props;
    return (
      <div>
        {this.stateTooltip()}
        <AuctionContainer />
        <div>
          <button className="continue" onClick={() => continueClick(board, game, pieceMap)}>Continue</button>
        </div>
        {
          this.props.board.playerNames.map(function (playerName: string) {
            return (
              <Board
                key={playerName}
                pieceMap={pieceMap}
                player={board.byPlayerName[playerName]}
                onMoveActivePiece={onMoveActivePiece}
                onRotateActivePiece={onRotateActivePiece}
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

