import React from "react";
import styled from "styled-components";
import Task from "./Task";
import StrictModeDroppable from "./StrictModeDroppable";
import { useState } from "react";
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  flex-grow: 1;
  min-heigth: 100px;
  background-color: ${props=>props.disabled?"gray":"white"}
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "gray" : "white")};
`;

const DisableHandle = styled.input`
  margin-left: 8px;
`;

export default function Column({ column, tasks }) {
  const [disabled, setDisabled] = useState(false);
  return (
    <Container disabled={disabled}>
      <div style={{ display: "flex" }}>
        <Title>{column.title}</Title>
        <DisableHandle
          type="checkbox"
          onChange={() => setDisabled((prev) => !prev)}
        />
      </div>
      <StrictModeDroppable droppableId={column.id} isDropDisabled={disabled}>
        {(provided, snapshot) => {
          const isDraggingOver = snapshot.isDraggingOver;
          return (
            <TaskList
              isDraggingOver={isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Task key={task.id} index={index} task={task} />
              ))}
              {provided.placeholder}
            </TaskList>
          );
        }}
      </StrictModeDroppable>
    </Container>
  );
}
