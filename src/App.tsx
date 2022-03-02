import React from "react";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Dashboard />
      </DndProvider>
    </div>
  );
}

export default App;
