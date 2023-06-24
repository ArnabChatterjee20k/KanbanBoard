import React from "react";
import StrictModeDroppable from "./components/StrictModeDroppable";
import CategoryColumn from "./components/CategoryColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { useColumnStore } from "./store/columnStore";
import { COLUMN_DROPPABLE, TASKS_DROPPABLE } from "./constants/DROPPABLE_TYPES";
import AddCategory from "./components/AddCategory";

export default function Board() {
  const { columnsOrder, reorderTask, moveTasks, reorderColumns } =
    useColumnStore((state) => ({
      columnsOrder: state.columnsOrder,
      reorderTask: state.reorderTask,
      moveTasks: state.moveTasks,
      reorderColumns: state.reorderColumns,
    }));

  return (
    <DragDropContext
      onDragEnd={(dndInfo) => {
        // reordering tasks
        const { source, destination, type } = dndInfo;
        if (type === COLUMN_DROPPABLE)
          reorderColumns(source.index, destination.index);
        else if (type === TASKS_DROPPABLE) {
          if (source.droppableId === destination.droppableId) {
            reorderTask(source.droppableId, source.index, destination.index);
          } else
            moveTasks(
              source.droppableId,
              destination.droppableId,
              source.index,
              destination.index
            );
        }
      }}
    >
      <StrictModeDroppable
        direction="HORIZONTAL"
        droppableId={"1"}
        type={COLUMN_DROPPABLE}
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
              <AddCategory />
              {provided.placeholder}
            </div>
          );
        }}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
