import React, { useRef, memo } from "react";
import { Item } from "./Dashboard";
import { useDrag, useDrop } from "react-dnd";
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
  const { id } = card;
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

  const [, connectDrop] = useDrop<IDragItem, void>({
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
