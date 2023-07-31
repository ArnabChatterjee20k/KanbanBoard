import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BoardPage from "../pages/Board/BoardPage";
import Task from "../pages/Task/Task";
import AuthRequired from "../components/AuthRequired";

export default function BoardRouter() {
  return (
    <Routes>
      <Route path="user/:userId/board">
        <Route
          path=":boardId"
          element={
            <AuthRequired>
              <BoardPage />
            </AuthRequired>
          }
        />
      </Route>
      <Route
        path={`/tasks/:taskId`}
        element={
          <AuthRequired>
            <Task />
          </AuthRequired>
        }
      />
    </Routes>
  );
}
