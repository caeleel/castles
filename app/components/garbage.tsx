import * as React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  DropTargetSpec } from "react-dnd";

export interface EventHandlerProps {
  deletePiece(id: number): void;
}

interface DragAndDropHandlerProps {
  connectDropTarget: ConnectDropTarget;
  isOver: boolean;
  canDrop: boolean;
}

export type GarbageProps = EventHandlerProps & DragAndDropHandlerProps;

const targetSpec: DropTargetSpec<GarbageProps> = {
  drop: (props: GarbageProps, monitor: DropTargetMonitor, component: Garbage) => {
    const item = (monitor.getItem() as any);

    props.deletePiece(item.id);
  },
  canDrop: (props: GarbageProps, monitor: DropTargetMonitor) => {
    const item = (monitor.getItem() as any);
    return item.id != 15;
  },
};

@DropTarget("piece", targetSpec, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export class Garbage extends React.Component<GarbageProps, {}> {
  public render(): JSX.Element | false {
    const { connectDropTarget, isOver, canDrop } = this.props;

    let className = "garbage";
    if (canDrop) { className += " visible"; }
    if (isOver) { className += " hovered"; }

    return connectDropTarget(<div className={className}><div className="garbage-background-image"/></div>);
  }
}
