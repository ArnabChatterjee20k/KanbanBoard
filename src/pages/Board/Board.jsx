import React from "react";
import StrictModeDroppable from "./components/StrictModeDroppable";
import CategoryColumn from "./components/CategoryColumn";
import { DragDropContext } from "react-beautiful-dnd";
import sampleData from "../../sampleData";
import { useTaskStore } from "./store/taskStore";
import { useColumnStore } from "./store/columnStore";

export default function Board() {
  const { tasks } = sampleData;
  const { columnsOrder, reorderTask,moveTasks } = useColumnStore((state) => ({
    columnsOrder: state.columnsOrder,
    reorderTask: state.reorderTask,
    moveTasks:state.moveTasks
  }));

  return (
    <DragDropContext
      onDragEnd={(dndInfo) => {
        console.log(dndInfo);
        // reordering tasks
        const { source, destination } = dndInfo;
        if (source.droppableId === destination.droppableId) {
          reorderTask(source.droppableId, source.index, destination.index);
        }
        else moveTasks(source.droppableId,destination.droppableId,source.index,destination.index)
      }}
    >
      <StrictModeDroppable
        direction="HORIZONTAL"
        droppableId={"1"}
        type="COLUMN-DROPPABLE"
      >
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-row gap-9 items-start flex-wrap"
            >
              {columnsOrder.map((columnId, index) => (
                <CategoryColumn id={columnId} index={index} key={columnId} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
