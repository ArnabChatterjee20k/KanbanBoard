import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
`;

const DragHandle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ disabled })=>disabled?"black":"orange"};
  border-radius: 4px;
  margin-right: 8px;
`;

const DisableHandle = styled.input`
  margin-left: 8px;
`;

const Content = styled.span`
  text-decoration: ${({ disabled }) => (disabled ? "line-through" : "none")};
  color: ${({ disabled }) => (disabled ? "gray" : "black")};
`;
export default function Task({ task, index }) {
  const [disabled, setDisabled] = useState(false);
  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={disabled}>
      {(provided, snapshot) => {
        const isDragging = snapshot.isDragging;
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            // {...provided.dragHandleProps}
            isDragging={isDragging}
          >
            {/* the handle for dragging */}
            <DragHandle {...provided.dragHandleProps} disabled={disabled}/>
            <Content disabled={disabled}>{task.content}</Content>
            <DisableHandle
              type="checkbox"
              onChange={() => setDisabled((prev) => !prev)}
            />
          </Container>
        );
      }}
    </Draggable>
  );
}
