import * as React from "react";
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

interface DataProps {
  pieceNames: string[];
}

interface EventHandlerProps {
  onSubmit: (name: string) => void;
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

  shouldRenderSuggestions = () => {
    return true;
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return this.props.pieceNames.filter((name: string) =>
      name.toLowerCase().slice(0, inputLength) === inputValue
    );
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

  submit = (e: any) => {
    e.preventDefault();
    for (let name of this.props.pieceNames) {
      if (name == this.state.value) {
        this.props.onSubmit(this.state.value);
        this.setState({value: ""});
        return;
      }
    }
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for a castle piece',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <form onSubmit={this.submit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          highlightFirstSuggestion={true}
        />
      </form>
    );
  }
}

