import * as React from "react";

import Pieces from '../../../lib/pieces';
import { BoardContainer } from "../containers/board";
import { Search } from './search';
import { BoardState } from '../reducers/board'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export interface DataProps {
  board: BoardState;
  pieceMap: Pieces.PieceMap;
}

export interface EventHandlerProps {
  onLoadPiecesClick(): void;
  addClick(name: string): void;
}

type GameProps = DataProps & EventHandlerProps;

class Game extends React.Component<GameProps, undefined> {
  render() {
    let { board, pieceMap, onLoadPiecesClick, addClick } = this.props;
    return (
      <div>
        <Search onSubmit={addClick} pieceNames={Object.keys(pieceMap)}/>
        Score: {board.score}
        <BoardContainer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Game);
