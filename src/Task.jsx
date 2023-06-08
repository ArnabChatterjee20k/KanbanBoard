import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props=>props.isDragging?"lightgreen":"white"};
`;

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided,snapshot) => {
        const isDragging = snapshot.isDragging
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging = {isDragging}
          >
            {task.content}
          </Container>
        );
      }}
    </Draggable>
  );
}
