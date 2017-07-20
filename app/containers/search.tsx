import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Search, DataProps, EventHandlerProps } from '../components/search';
import { AppState } from '../reducers/reducers';

function mapStateToProps(state: AppState): DataProps {
  return {
    board: state.board,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    deletePiece(id: number): void {
      dispatch(actions.board.setSelectedPieceId({id: -1}));
      dispatch(actions.board.deletePiece({id: id}));
    },
    addPiece(id: number): void {
      dispatch(actions.board.addPiece({id}));
      dispatch(actions.board.setSelectedPieceId({id: id}));
    },
  };
}

export const SearchContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
