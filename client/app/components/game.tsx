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
  render() {
    let { board, pieceMap, deletePiece, addClick } = this.props;
    return (
      <div>
        <Garbage isOver={false} canDrop={false} deletePiece={deletePiece} connectDropTarget={null} />
        <Search onSubmit={addClick} pieceNames={Object.keys(pieceMap).sort()}/>
        <h2>Score: {board.score}</h2>
        <BoardContainer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Game);
