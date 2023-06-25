import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "../pages/Board/Board";

export default function BoardRouter() {
  return (
    <Routes>
      <Route path="board">
        <Route path=":id" Component={Board} />
      </Route>
    </Routes>
  );
}
