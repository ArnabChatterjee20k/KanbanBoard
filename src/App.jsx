import React, { useState } from "react";
import initialData from "./initialData";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const dropWithinCol = (state, col, source, destination) => {
  const newTaskIds = Array.from(col.taskIds);
  const [removed] = newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, removed);

  const newCol = {
    ...col,
    taskIds: newTaskIds,
  };

  return {
    ...state,
    columns: {
      ...state.columns,
      [newCol.id]: newCol,
    },
  };
};

const dropBetweenCols = (state, startCol, endCol, source, destination,draggableId) => {
  const startTaskIds = Array.from(startCol.taskIds);
  startTaskIds.splice(source.index, 1);

  const newStartCol = {
    ...startCol,
    taskIds: startTaskIds,
  };

  const endTaskIds = Array.from(endCol.taskIds);
  endTaskIds.splice(destination.index, 0, draggableId);

  const newEndCol = {
    ...endCol,
    taskIds: endTaskIds,
  };

  return {
    ...state,
    columns: {
      ...state.columns,
      [newStartCol.id]: newStartCol,
      [newEndCol.id]: newEndCol,
    },
  };
};

export default function App() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const startCol = state.columns[source.droppableId];
    const endCol = state.columns[destination.droppableId];

    let newState;

    if (startCol === endCol) {
      newState = dropWithinCol(state, startCol, source, destination);
    } else {
      newState = dropBetweenCols(state, startCol, endCol, source, destination,draggableId);
    }

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {state.columnOrder.map((colId) => {
          const col = state.columns[colId];
          const tasks = col.taskIds.map((taskId) => state.tasks[taskId]);
          return <Column key={col.id} column={col} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
}
