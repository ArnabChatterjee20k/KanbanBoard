import React from "react";
import { Route, Routes } from "react-router-dom";
import BoardPage from "../pages/Board/BoardPage";
import ColumnView from "../pages/Column/components/ColumnView";

export default function BoardRouter() {
  return (
    <Routes>
      <Route path="board">
        <Route path=":boardId" Component={BoardPage}>
          <Route path="columns/:columnId" Component={ColumnView} />
        </Route>
      </Route>
    </Routes>
  );
}
