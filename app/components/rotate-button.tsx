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

  render() {
    let { selectedPieceId } = this.props.board;
    if (selectedPieceId < 0) {
      return null;
    }

    return (
      <button
        className={this.classNames()}
        onClick={() => { this.props.rotatePiece(selectedPieceId) }}
        onTouchStart={(e: any) => {
          this.props.rotatePiece(selectedPieceId);
          e.preventDefault(); // Prevent double click from zooming the page in on mobile
        }}
      />

    )
  }
}
