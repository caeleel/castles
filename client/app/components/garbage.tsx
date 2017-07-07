import * as React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec } from 'react-dnd';

export interface EventHandlerProps {
  deletePiece(id: number): void;
}

interface DragAndDropHandlerProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  canDrop: boolean;
}

export type GarbageProps = EventHandlerProps & DragAndDropHandlerProps;

let targetSpec: DropTargetSpec<GarbageProps> = {
  drop: (props: GarbageProps, monitor: DropTargetMonitor, component: Garbage) => {
    let item = (monitor.getItem() as any);

    props.deletePiece(item.id);
  }
}

@DropTarget('piece', targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export class Garbage extends React.Component<GarbageProps, {}> {
  render(): JSX.Element | false {
    let { connectDropTarget, isOver, canDrop } = this.props;

    let className = "garbage";
    if (canDrop) {
      className += " visible";
    }
    if (isOver) {
      className += " hovered";
    }
    return connectDropTarget(
      <div className={className}>
      </div>
    );
  }
}
