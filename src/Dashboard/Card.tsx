import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Item } from "./Dashboard";

const PaperItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "150px",
  width: "150px",
}));

interface IProps {
  card: Item;
}

export default function Card({ card }: IProps) {
  const { text, id } = card;

  return (
    <PaperItem>
      <div>{text}</div>
      <div style={{ fontSize: 26 }}>{id}</div>
    </PaperItem>
  );
}
