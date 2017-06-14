import Pieces from '../../../lib/pieces';
import { actionCreator } from './helpers'

export namespace piece {
  export const setSelectedPieceName = actionCreator<{ playerName: string, pieceName: string }>('SET_SELECTED_PIECE_NAME');
  export const moveSelectedPiece = actionCreator<{ playerName: string, x: number, y: number }>('MOVE_SELECTED_ID');
  export const setPieces = actionCreator<{ pieceMap: Pieces.PieceMap }>('SET_PIECES');
}
