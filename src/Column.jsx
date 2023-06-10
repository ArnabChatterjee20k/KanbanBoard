import React from "react";
import styled from "styled-components";
import Task from "./Task";
import StrictModeDroppable from "./StrictModeDroppable";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  flex-grow:1;
  min-heigth:100px;
  `;
  const Title = styled.h3`
  padding: 8px;
  `;
  const TaskList = styled.div`
  padding: 8px;
  transition:background-color 0.2s ease;
  background-color:${props=>props.isDraggingOver?"gray":"white"};
`;

export default function Column({ column, tasks }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <StrictModeDroppable droppableId={column.id}>
        {(provided, snapshot) => {
          const isDraggingOver = snapshot.isDraggingOver;
          return (
            <TaskList isDraggingOver={isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
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
