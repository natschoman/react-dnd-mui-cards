import React, { useRef, memo, FC } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Item } from "./Dashboard";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord, Identifier } from "dnd-core";
import { ItemTypes } from "./itemType";

interface IProps {
  card: Item;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  children: any;
}

interface IDragItem {
  id: number;
  type: string;
}

const DragItem = memo(({ card, moveCard, children }: IProps) => {
  const { text, id } = card;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, connectDrag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, connectDrop] = useDrop<
    IDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    hover(item: IDragItem, monitor) {
      if (item.id !== id) {
        moveCard(item.id, id);
      }
    },
  });

  connectDrag(ref);
  connectDrop(ref);

  const opacity = isDragging ? 0 : 1;
  const containerStyle = { opacity };

  return React.Children.map(children, (child) =>
    React.cloneElement(child as any, {
      forwardedRef: ref,
      style: containerStyle,
    })
  );
});

export default DragItem;
