import * as React from "react";
import { SearchContainer } from '../containers/search';
import { BoardContainer } from '../containers/board';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Pieces from '../../../lib/pieces';

export interface Props {
  score: number;
  scorablePieceMap: Pieces.PieceMap;
}

class App extends React.Component<Props, {}> {
  title() {
    if (this.props.score > 0) {
      return "Score: " + this.props.score;
    } else {
      return "Castles Score Checker";
    }
  }

  render() {
    return (
      <div>
        <h1 className={this.props.score > 0 ? "score" : ""}>{this.title()}</h1>
        <p className="tooltip" style={{visibility: this.props.score > 0 ? "visible" : "hidden"}}>
          Also add your starting points and points from underground room bonuses
        </p>
        <SearchContainer />
        <BoardContainer scorablePieceMap={this.props.scorablePieceMap} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
