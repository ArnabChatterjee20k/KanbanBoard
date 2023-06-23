import { Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "./StrictModeDroppable";
import { TASKS_DROPPABLE } from "../constants/DROPPABLE_TYPES";
import TasksList from "./TasksList";

export default function CategoryColumn({ id, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <StrictModeDroppable droppableId={id} type={TASKS_DROPPABLE}>
              {(provided, snpashot) => {
                return (
                  <div
                    // className="bg-red-400"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TasksList id={id} />
                    {provided.placeholder}
                  </div>
                );
              }}
            </StrictModeDroppable>
          </div>
        );
      }}
    </Draggable>
  );
}
