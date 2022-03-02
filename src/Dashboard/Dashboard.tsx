import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "./Card";
import DragItem from "./DragItem";

export interface Item {
  id: number;
  text: string;
}

const initCards: Item[] = [
  {
    id: 1,
    text: "Card 1",
  },
  {
    id: 2,
    text: "Card 2",
  },
  {
    id: 3,
    text: "Card 3",
  },
  {
    id: 4,
    text: "Card 4",
  },
  {
    id: 5,
    text: "Card 5",
  },
  {
    id: 6,
    text: "Card 6",
  },
  {
    id: 7,
    text: "Card 7",
  },
  {
    id: 8,
    text: "Card 8",
  },
];

export default function Dashboard() {
  const [cards, setCards] = useState(initCards);

  const moveCard = (sourceId: number, destinationId: number) => {
    const sourceIndex = cards.findIndex((card) => card.id === sourceId);
    const destinationIndex = cards.findIndex(
      (card) => card.id === destinationId
    );

    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;

    const newCards = moveElement(cards, sourceIndex, offset);
    setCards(newCards);
  };

  return (
    <Box sx={{ flexGrow: 1, background: "lightgrey" }}>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={4} key={card.id}>
            <DragItem key={card.id} card={card} moveCard={moveCard}>
              <CardWrapper>
                <Card card={card} />
              </CardWrapper>
            </DragItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const CardWrapper = ({ forwardedRef, ...props }: any) => (
  <div
    ref={forwardedRef}
    {...props}
    style={{ width: 166, height: 166, margin: "auto" }}
  />
);

// Helper functions
function move(array: Item[], oldIndex: number, newIndex: number) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function moveElement(array: Item[], index: number, offset: number) {
  const clonedArr = JSON.parse(JSON.stringify(array));
  const newIndex = index + offset;

  return move(clonedArr, index, newIndex);
}
