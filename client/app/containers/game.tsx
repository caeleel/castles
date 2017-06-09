import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Game, DataProps, EventHandlerProps } from '../components/game'
import { Piece } from '../components/piece'
import Pieces from '../../../lib/pieces';
import { AppState } from '../reducers/reducers';

function mapStateToProps(state: AppState): DataProps {
  return {
    pieceMap: state.pieces.pieceMap,
    selectedId: state.pieces.selectedId,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: Piece.PieceProps): EventHandlerProps {
  return {
    onLoadPiecesClick(): void {
      Pieces.loadPieces().then((pieceMap : Pieces.PieceMap) => {
        dispatch(actions.piece.setPieces({pieceMap: pieceMap}));
      }).catch(err => {
        console.log(err);
      })

    },
    onPieceClick(id: string): void {
        dispatch(actions.game.echo({
            data: 'hello'
        }));
        dispatch(actions.piece.setSelectedId({id: id}))
    },
    onMoveClick(x: number, y: number): void {
        dispatch(actions.piece.moveSelectedId({x: x, y: y}));
    },
  };
}

const GameContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

export default GameContainer
