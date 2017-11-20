import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../actions/actions";
import App, { DataProps, EventHandlerProps } from "../components/app";
import Pieces from "../lib/pieces";
import { Score } from "../lib/score";
import { AppState } from "../reducers/reducers";

function mapStateToProps(state: AppState): DataProps {
  const scorablePieceMap = Score.getScorablePieceMap(state.board.pieces, state.board.pieceIds);
  const keys: number[] = [];
  for (const i in scorablePieceMap) {
    keys.push(+i);
  }
  return {
    pieceScores: Score.score(state.board.pieces, keys),
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
    deletePiece(id: number): void {
      dispatch(actions.board.selectPiece({id: -1}));
      dispatch(actions.board.deletePiece({id}));
    },
    addPiece(id: number): void {
      dispatch(actions.board.addPiece({id}));
      dispatch(actions.board.selectPiece({id: -1}));
    },
    selectPiece(id: number): void {
      dispatch(actions.board.selectPiece({id}));
    },
    setPieces(pieces: Pieces.Piece[]): void {
      dispatch(actions.board.setPieces({pieces}));
    },
  };
}

export const AppContainer = connect<DataProps, EventHandlerProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
