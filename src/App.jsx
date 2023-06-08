import React, { useState } from "react";
import initialData from "./initialData";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  const [state, setState] = useState(initialData)
  
  const onDragEnd = (result) => {
    // TODO: reorder logic after drag is dropped
    // console.log(result);
    const { destination, source, draggableId } = result;
    // out of the dropzone
    if (!destination) return;

    // droped at the same position
    if (
      destination.draggableId === source.draggableId &&
      destination.index === source.index
    )
      return;

    const col = state.columns[source.droppableId];
    const newTaskIds = [...col.taskIds];

    //taking the item
    const [item] = newTaskIds.splice(source.index, 1);

    // putting the item
    newTaskIds.splice(destination.index, 0, item);

    const newCol = {
      ...col,
      taskIds: newTaskIds,
    };

    // updating the state
    const newState = {
      ...state,
      columns:{
        ...state.columns,
        [newCol.id]:newCol
      }
    }

    setState(newState)
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((colId) => {
        const col = state.columns[colId];
        const tasks = col.taskIds.map((taskId) => state.tasks[taskId]);
        return <Column key={col.id} column={col} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}
