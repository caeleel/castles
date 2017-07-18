import * as React from "react";
import { BoardState } from '../reducers/board';

export interface DataProps {
  board: BoardState;
}

export interface EventHandlerProps {
  rotatePiece(id: number): void;
}

export type RotateButtonProps = DataProps & EventHandlerProps;

export class RotateButton extends React.Component<RotateButtonProps, {}> {

  classNames() {
    if (this.props.board.selectedPieceId < 0) {
      return "rotate disabled";
    } else {
      return "rotate";
    }
  }

  click() {
    this.props.rotatePiece(this.props.board.selectedPieceId);
  }
  render() {
    return (
      <button className={this.classNames()} onClick={this.click.bind(this)}></button>
    )
  }
}
