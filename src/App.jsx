import React from "react";
import Navigation from "./layout/Navigation";
import { Layout, List } from "antd";
import Board from "./pages/Board/Board";

export default function App() {
  return (
    <>
      <Navigation>
        <Board/>
      </Navigation>
    </>
  );
}