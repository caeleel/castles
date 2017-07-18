import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { RotateButton, DataProps, EventHandlerProps } from '../components/rotate-button'
import { AppState } from '../reducers/reducers';

function mapStateToProps(state: AppState): DataProps {
  return {
    board: state.board,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    rotatePiece(id: number): void {
      dispatch(actions.board.rotatePiece({id}));
    }
  };
}

export const RotateButtonContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(RotateButton);

