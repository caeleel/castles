import Pieces from '../../../lib/pieces';

export interface SetSelectedIdActionType {
    type: string;
    id: string;
}

export interface MoveSelectedIdActionType {
    type: string;
    id: string;
}

export interface SetPiecesType {
    type: string;
    id: string;
}

export const setSelectedId = (id: string) => ({
  type: 'SET_SELECTED_ID',
  id
})

export const moveSelectedId = (id: string) => ({
  type: 'MOVE_SELECTED_ID',
  id
})

export const setPieces = (pieces: Array<Pieces.Piece>) => ({
  type: 'SET_PIECES',
  pieces
})
