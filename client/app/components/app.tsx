import * as React from "react";
import { SearchContainer } from '../containers/search';
import { BoardContainer } from '../containers/board';
import { RotateButtonContainer } from '../containers/rotate-button';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Score } from '../../../lib/score';

export interface Props {
  pieceScores: Score.PieceScores;
}

class App extends React.Component<Props, {}> {
  title() {
    if (this.props.pieceScores.sum > 0) {
      return "Score: " + this.props.pieceScores.sum;
    } else {
      return "Castles Score Checker";
    }
  }

  render() {
    return (
      <div>
        <h1 className={this.props.pieceScores.sum > 0 ? "" : ""}>{this.title()}</h1>
        <p className="tooltip" style={{visibility: this.props.pieceScores.sum > 0 ? "visible" : "hidden"}}>
          Also add your starting points and points from underground room bonuses
        </p>
        <SearchContainer />
        <BoardContainer pieceScores={this.props.pieceScores} />
        <RotateButtonContainer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
