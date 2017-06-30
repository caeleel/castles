import { connect } from 'react-redux'
import * as actions from '../actions/actions';
import { Dispatch } from 'redux';
import Game, { DataProps, EventHandlerProps } from '../components/game'
import { Piece } from '../components/piece'
import Pieces from '../../../lib/pieces';
import { AppState } from '../reducers/reducers';
import { BoardState } from '../reducers/board';
import { State, GameState } from '../reducers/game';

function mapStateToProps(state: AppState): DataProps {
  return {
    board: state.board,
    game: state.game,
    pieceMap: state.pieces.pieceMap,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): EventHandlerProps {
  return {
    onLoadPiecesClick(): void {
      Pieces.loadPieces().then((pieceMap : Pieces.PieceMap) => {
        dispatch(actions.piece.setPieces({pieceMap: pieceMap}));
      }).catch(err => {
        console.log(err);
      })

    },
    continueClick(board: BoardState, game: GameState, pieces: Pieces.PieceMap): void {
      switch (game.mode) {
        case State.Placing:
          if (!board.byPlayerName[board.playerNames[0]].selectedPiece) {
            return;
          }
          dispatch(actions.auction.removeSelectedPiece({name: board.byPlayerName[board.playerNames[0]].selectedPiece.name}));
          dispatch(actions.board.placeSelectedPiece({playerName: 'golf'}));
        case State.Pricing:
          console.log("did nothing");
      }
      dispatch(actions.game.nextState());
    },
  };
}

const GameContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Game);

export default GameContainer
