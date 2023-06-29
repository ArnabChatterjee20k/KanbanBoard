import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BoardPage from "../pages/Board/BoardPage";
import Task from "../pages/Task/Task";

export default function BoardRouter() {
  
  return (
    <Routes>
      <Route path="board">
        <Route path=":boardId" Component={BoardPage}/>
      </Route>
      {/* <Route path="/tasks/:taskId" Component={Task} /> */}
      <Route path={`/tasks/:taskId`} Component={Task}/>
    </Routes>
  );
}