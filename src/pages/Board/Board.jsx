import React from "react";
import StrictModeDroppable from "./components/StrictModeDroppable";
import CategoryColumn from "./components/CategoryColumn";
import { DragDropContext } from "react-beautiful-dnd";
export default function Board() {
  return (
    <DragDropContext>
      <StrictModeDroppable
        direction="HORIZONTAL"
        droppableId={"1"}
        type="BOARD"
      >
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-row gap-9 items-start flex-wrap"
            >
              <CategoryColumn id={1} />
              <CategoryColumn id={2} />
              <CategoryColumn id={3} />
              <CategoryColumn id={4} />
              <CategoryColumn id={5} />
              {provided.placeholder}
            </div>
          );
        }}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
