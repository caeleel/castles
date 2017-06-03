import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import { Board, DataProps, EventHandlerProps } from '../components/board'
import { Piece } from '../components/piece'
import Pieces from '../../../lib/pieces';
import { AppState } from '../reducers/reducers';

function mapStateToProps(state: AppState): DataProps {
  return {
    pieces: state.pieces.pieces,
    selectedId: state.pieces.selectedId,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: Piece.PieceProps): EventHandlerProps {
  return {
    onLoadPiecesClick(): void {
      let lol: Array<Pieces.Piece> = []
      Pieces.loadPieces().then((pieces : Pieces.Piece[]) => {
        dispatch(actions.setPieces(pieces));
      }).catch(err => {
        console.log(err);
      })

    },
    onPieceClick(id: string): void {
        dispatch(actions.game.echo({
            data: 'hello'
        }));
        dispatch(actions.setSelectedId(id))
    },
  };
}

const BoardContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

export default BoardContainer
