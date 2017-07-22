import * as React from "react";
import Pieces from '../lib/pieces';
import { Garbage } from './garbage';
import { BoardState } from '../reducers/board';
var Autosuggest = require("react-autosuggest")

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: string) => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: string) => (
  <div className="suggestion-content">
    <img src={"public/" + suggestion.toLowerCase() + ".png"} />
    {suggestion}
  </div>
);

export interface DataProps {
  board: BoardState;
}

export interface EventHandlerProps {
  addPiece: (id: number) => void;
  deletePiece: (id: number) => void;
}

type SearchProps = DataProps & EventHandlerProps;

interface State {
  value: string;
  suggestions: string[];
}

export class Search extends React.Component<SearchProps, State> {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event: any, { newValue }: {newValue: string}) => {
    this.setState({
      value: newValue
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let pieceMap: Pieces.PieceMap = {};
    for (let id of this.props.board.pieceIds) {
      pieceMap[id] = this.props.board.pieces[id];
    }

    let prevPieceName = '';
    return this.props.board.pieces.filter((piece: Pieces.Piece, index: number) => {
      if (prevPieceName == piece.name || pieceMap[index]) {
        return false;
      }
      prevPieceName = piece.name;
      return piece.name.toLowerCase().slice(0, inputLength) === inputValue;
    }).map((piece: Pieces.Piece) => {
      return piece.name;
    }).sort();
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }: {value: string}) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // Autosuggest will call this function every time suggestion is selected via mouse or keyboard.
  onSuggestionSelected = (event: Event, suggestionEventData: any) => {
    let pieceMap: Pieces.PieceMap = {};
    for (let id of this.props.board.pieceIds) {
      pieceMap[id] = this.props.board.pieces[id];
    }

    for (let index in this.props.board.pieces) {
      if (this.props.board.pieces[index].name == suggestionEventData.suggestionValue && !pieceMap[index]) {
        this.props.addPiece(+index);
        this.setState({value: ""});
        return;
      }
    }
  };

  pieceNames = () => {
    return this.props.board.pieces.map((piece: Pieces.Piece) => { return piece.name });
  }

  render() {
    const { deletePiece, board } = this.props;
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for a castle piece',
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Garbage isOver={false} canDrop={false} deletePiece={deletePiece} connectDropTarget={null} />
        <form onSubmit={(e: any) => {e.preventDefault();}}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            shouldRenderSuggestions={() => true}
            highlightFirstSuggestion={true}
          />
        </form>
      </div>
    );
  }
}

