import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Board, PublicProps, DataProps, EventHandlerProps } from '../components/board'
import { AppState } from '../reducers/reducers';

function mapStateToProps(state: AppState, ownProps: PublicProps): DataProps | PublicProps {
  return {
    scorablePieceMap: ownProps.scorablePieceMap,
    board: state.board,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    movePiece(id: number, x: number, y: number): void {
      dispatch(actions.board.movePiece({id, x, y}));
    },
    rotatePiece(id: number): void {
      dispatch(actions.board.rotatePiece({id}));
    },
    selectPiece(id: number): void {
      dispatch(actions.board.setSelectedPieceId({id}));
    }
  };
}

export const BoardContainer = connect<DataProps | PublicProps, EventHandlerProps, PublicProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

