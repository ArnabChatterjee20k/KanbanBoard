import React from "react";
import StrictModeDroppable from "./components/StrictModeDroppable";
import CategoryColumn from "./components/CategoryColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { useColumnStore } from "./store/columnStore";
import { COLUMN_DROPPABLE, TASKS_DROPPABLE } from "./constants/DROPPABLE_TYPES";
import AddCategory from "./components/AddCategory";
import { useParams } from "react-router-dom";
import { useBoardStore } from "../../store/boardStore";

export default function Board() {
  const { reorderTask, moveTasks, reorderColumns } = useColumnStore(
    (state) => ({
      reorderTask: state.reorderTask,
      moveTasks: state.moveTasks,
      reorderColumns: state.reorderColumns,
    })
  );
  const { id } = useParams();
  const boards = useBoardStore((state) => state.boards);
  const { columns: columnsOrder } = boards[id];

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
              {/* Rendering Columns */}
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
