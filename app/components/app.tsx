import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import Pieces from "../lib/pieces";
import { Score } from "../lib/score";
import { UrlPieceEncoding } from "../lib/url_piece_encoding";
import { BoardState } from "../reducers/board";
import { Board } from "./board";
import { RotateButton } from "./rotate-button";
import { Search } from "./search";

export interface DataProps {
  pieceScores: Score.PieceScores;
  board: BoardState;
}

export interface EventHandlerProps {
  movePiece(id: number, x: number, y: number): void;
  rotatePiece(id: number): void;
  deletePiece(id: number): void;
  addPiece(id: number): void;
  selectPiece(id: number): void;
  setPieces(pieces: Pieces.Piece[]): void;
}

const isMobile = () => {
  let check = false;
  (function(a) {if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) { check = true; }})(navigator.userAgent || navigator.vendor);
  return check;
};

class App extends React.Component<DataProps & EventHandlerProps, {}> {
  public componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));

    this.loadPiecesFromUrlHash();
  }

  public loadPiecesFromUrlHash() {
    if (window.location.hash[0] === "#") {

      const piecesTextArray = window.location.hash.substring(1).split("&");
      for (const pieceText of piecesTextArray) {
        const loadedPieceData = UrlPieceEncoding.toLoadedPieceData(pieceText);
        if (!loadedPieceData.valid) {
          return;
        }
        for (let i = 0; i < loadedPieceData.rotateNumTimes; i++) {
          const piece = this.props.board.pieces[loadedPieceData.id];
          piece.rotate();
        }
        this.props.board.pieces[loadedPieceData.id].moveTo(loadedPieceData.x, loadedPieceData.y);
        if (loadedPieceData.id != 15) {
          this.props.addPiece(loadedPieceData.id);
        }
      }
      this.props.setPieces(this.props.board.pieces);
    }
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  public onKeyPressed(e: KeyboardEvent) {
    if (this.props.board.selectedPieceId < 0) {
      return;
    }
    const selectedPiece = this.props.board.pieces[this.props.board.selectedPieceId];
    let {x, y} = selectedPiece;
    switch (e.keyCode) {
      case 38: y = Math.ceil((y - 2) / 2) * 2; break; // up
      case 40: y = Math.floor((y + 2) / 2) * 2; break; // down
      case 37: x = Math.ceil((x - 2) / 2) * 2; break; // left
      case 39: x = Math.floor((x + 2) / 2) * 2; break; // right
      case 32: this.props.rotatePiece(this.props.board.selectedPieceId); return; // spacebar
      case 8: this.props.deletePiece(this.props.board.selectedPieceId); return; // backspace
      case 46: this.props.deletePiece(this.props.board.selectedPieceId); return; // delete
      default: return;
    }
    this.props.movePiece(this.props.board.selectedPieceId, x, y);
    e.preventDefault();
  }

  public tooltip() {
    if (this.props.pieceScores.sum > 0) {
      return (
        <div className="tooltip">
          <p className="" style={{fontSize: "1.6em", fontWeight: "bold"}}>
            <span style={{color: "green"}}>
              {this.props.pieceScores.sum}
            </span> point{this.props.pieceScores.sum > 1 ? "s" : ""}
          </p>
          <p style={{fontSize: ".6em", lineHeight: "1.5em"}}>
            Also add your starting points and points from underground room bonuses
          </p>
        </div>
      );
    } else {
      return (
        <ol className="tooltip">
          <li>Search for your castle pieces</li>
          <li>Drag them into place</li>
        </ol>
      );
    }
  }

  public render() {
    return (
      <div>
        <Board
          board={this.props.board}
          pieceScores={this.props.pieceScores}
          movePiece={this.props.movePiece}
          selectPiece={this.props.selectPiece}
          connectDropTarget={null}
          connectDragSource={null}
          connectDragPreview={null}
        />
        {this.tooltip()}

        <Search
          board={this.props.board}
          deletePiece={this.props.deletePiece}
          addPiece={this.props.addPiece}
          selectPiece={this.props.selectPiece}
        />
        <RotateButton
          board={this.props.board}
          rotatePiece={this.props.rotatePiece}
        />
      </div>
    );
  }
}

let app: any;
if (isMobile()) {
  app = DragDropContext(TouchBackend)(App);
} else {
  app = DragDropContext(HTML5Backend)(App);
}

export default app;
