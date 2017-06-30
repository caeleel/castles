import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Board, DataProps, EventHandlerProps } from '../components/board'
import { Piece } from '../components/piece'
import Pieces from '../../../lib/pieces';
import Players from '../../../lib/players';
import { AppState } from '../reducers/reducers';
import { BoardState } from '../reducers/board';

interface BoardContainerProps {
  player: Players.Player;
}

function mapStateToProps(state: AppState, ownProps: BoardContainerProps): DataProps {
  return {
    player: ownProps.player,
    pieceMap: state.pieces.pieceMap,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    movePiece(pieceName: string, playerName: string, x: number, y: number): void {
      // TODO: if mode is pricing, prevent this action
      dispatch(actions.board.moveSelectedPiece({pieceName: pieceName, playerName: playerName, x: x, y: y}));
    },
    rotateSelectedLeft(playerName: string): void {
      dispatch(actions.board.rotateSelectedLeft({playerName: playerName}));
    },
    rotateSelectedRight(playerName: string): void {
      dispatch(actions.board.rotateSelectedRight({playerName: playerName}));
    },
  };
}

export const BoardContainer = connect<DataProps, EventHandlerProps, BoardContainerProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

