import React from "react";
import StrictModeDroppable from "./StrictModeDroppable";
import CategoryColumn from "./CategoryColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { useColumnStore } from "../store/columnStore";
import {
  COLUMN_DROPPABLE,
  TASKS_DROPPABLE,
} from "../constants/DROPPABLE_TYPES";
import AddCategory from "./AddCategory";
import { useBoardStore } from "../../../store/boardStore";
import useGetAllCols from "../../../services/useGetAllCols";
import useBoardAdminDetails from "../../../hooks/useGetBoardAdminDetails";
import Loader from "../../../components/Loader";

export default function Board({ board }) {
  const { reorderTask, moveTasks, setCols } = useColumnStore((state) => ({
    reorderTask: state.reorderTask,
    moveTasks: state.moveTasks,
    setCols: state.setCols,
  }));

  const { reorderColumns } = useBoardStore((state) => ({
    reorderColumns: state.reorderColumns,
  }));
  const { order: columnsOrder } = board;

  const { userId, boardId } = useBoardAdminDetails();
  const { isLoading } = useGetAllCols(boardId, userId);
  if (isLoading) return <Loader message="Loading Categories...." />;
  return (
    <DragDropContext
      onDragEnd={(dndInfo) => {
        // reordering tasks
        const { source, destination, type } = dndInfo;
        if (type === COLUMN_DROPPABLE)
          reorderColumns(board.id, source.index, destination.index);
        else if (type === TASKS_DROPPABLE) {
          if (source.droppableId === destination.droppableId) {
            reorderTask(source.droppableId, source.index, destination.index);
          } else
            moveTasks(
              source.droppableId,
              +destination.droppableId,
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
              {(columnsOrder || []).map((columnId, index) => (
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
