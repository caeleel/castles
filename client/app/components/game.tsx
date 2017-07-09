import * as React from "react";

import Pieces from '../../../lib/pieces';
import { BoardContainer } from "../containers/board";
import { Search } from './search';
import { Garbage } from './garbage';
import { BoardState } from '../reducers/board'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export interface DataProps {
  board: BoardState;
  pieceMap: Pieces.PieceMap;
}

export interface EventHandlerProps {
  deletePiece(id: number): void;
  addClick(name: string): void;
}

type GameProps = DataProps & EventHandlerProps;

class Game extends React.Component<GameProps, {}> {

  title() {
    if (this.props.board.score > 0) {
      return "Score: " + this.props.board.score;
    } else {
      return "Castles Score Checker";
    }
  }
  render() {
    let { board, pieceMap, deletePiece, addClick } = this.props;
    return (
      <div>
        <h1>{this.title()}</h1>
        <p className="tooltip" style={{visibility: board.score > 0 ? "visible" : "hidden"}}>
          Also add your starting points and any underground room re-scores
        </p>
        <Garbage isOver={false} canDrop={false} deletePiece={deletePiece} connectDropTarget={null} />
        <Search onSubmit={addClick} pieceNames={Object.keys(pieceMap).sort()}/>
        <BoardContainer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Game);
