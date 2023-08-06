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
import useBoardAdminDetails from "../../../hooks/useGetBoardAdminDetails";
import Loader from "../../../components/Loader";
import useGetAllCols from "../../../services/useGetAllCols";
import api from "../../../api/API";
import useMessage from "../../../hooks/useMessage";

// declaring it outside the component so the inner function does not get created everytime and debounce occur perfectly
const reOrderColApiAction = api.reOrderCol()

export default function Board({ board }) {
  const { reorderTask, moveTasks } = useColumnStore((state) => ({
    reorderTask: state.reorderTask,
    moveTasks: state.moveTasks,
  }));

  const { reorderColumns, setOrder } = useBoardStore((state) => ({
    reorderColumns: state.reorderColumns,
    setOrder: state.setOrder,
  }));

  const [message, messageHolder] = useMessage();

  const { order: columnsOrder } = board;

  const { userId, boardId } = useBoardAdminDetails();
  const { isLoading, data, error } = useGetAllCols(boardId, userId);
  const [isError, errorCondition] = error;
  if (isError) throw new Error(errorCondition);
  if (isLoading) return <Loader message="Loading Categories...." />;

  return (
    <DragDropContext
      onDragEnd={(dndInfo) => {
        // reordering tasks
        const { source, destination, type } = dndInfo;
        if (type === COLUMN_DROPPABLE) {
          const prevOrder = columnsOrder;
          const newOrder = reorderColumns(
            boardId,
            source.index,
            destination.index
          );
          console.log({newOrder});
          reOrderColApiAction(boardId, newOrder).catch(() => {
            message.error("Reorder Failed");
            setOrder(boardId, prevOrder);
            setTimeout(() => {
              message.destroy();
            }, 3000);
          });
        } else if (type === TASKS_DROPPABLE) {
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
              {messageHolder}
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
