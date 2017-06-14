import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Game, DataProps, EventHandlerProps } from '../components/game'
import { Piece } from '../components/piece'
import Pieces from '../../../lib/pieces';
import { AppState } from '../reducers/reducers';

function mapStateToProps(state: AppState): DataProps {
  return {
    board: state.board,
    game: state.game,
    pieceMap: state.pieces.pieceMap,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: DataProps): EventHandlerProps {
  return {
    onLoadPiecesClick(): void {
      Pieces.loadPieces().then((pieceMap : Pieces.PieceMap) => {
        dispatch(actions.piece.setPieces({pieceMap: pieceMap}));
      }).catch(err => {
        console.log(err);
      })

    },
    onMoveActivePiece(playerName: string, x: number, y: number): void {
      dispatch(actions.piece.moveSelectedPiece({playerName: playerName, x: x, y: y}));
    },
    onRotateActivePiece(playerName: string): void {

    }
  };
}

const GameContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

export default GameContainer
