import * as React from "react";
import { SearchContainer } from '../containers/search';
import { BoardContainer } from '../containers/board';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export interface Props {
  score: number;
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
        <h1>{this.title()}</h1>
        <p className="tooltip" style={{visibility: this.props.score > 0 ? "visible" : "hidden"}}>
          Also add your starting points and underground room re-scores
        </p>
        <SearchContainer />
        <BoardContainer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
