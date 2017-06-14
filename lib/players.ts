import 'isomorphic-fetch'
import Pieces from './pieces';


module Players {
  export interface Player {
    name: string;
    pieces: Pieces.PiecePlacement[];
    selectedPiece: Pieces.PiecePlacement;
  }
}

export default Players;
