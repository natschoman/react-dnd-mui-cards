import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Item } from "./Dashboard";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord, Identifier } from "dnd-core";
import { ItemTypes } from "./itemType";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

const PaperItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100px",
  width: "100px",
}));

interface IProps {
  card: Item;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: number;
  type: string;
}

export default function Card({ card, index, moveCard }: IProps) {
  const { text, id } = card;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, connectDrag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, connectDrop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    // collect(monitor) {
    //   return {
    //     handlerId: monitor.getHandlerId(),
    //   };
    // },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      if (item.id !== id) {
        console.log(dragIndex, hoverIndex);
        moveCard(item.id, id);
      }
    },
  });

  const opacity = isDragging ? 0 : 1;

  connectDrag(ref);
  connectDrop(ref);

  return (
    <Grid item xs={4}>
      <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
        <PaperItem>{text}</PaperItem>
      </div>
    </Grid>
  );
}
