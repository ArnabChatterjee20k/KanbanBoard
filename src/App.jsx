import React from "react";
import Navigation from "./layout/Navigation";
import { Layout, List } from "antd";
import { BrowserRouter } from "react-router-dom";
import BoardRouter from "./router/BoardRouter";

export default function App() {
  return (
    <BrowserRouter>
      <Navigation>
        <BoardRouter/>
      </Navigation>
    </BrowserRouter>
  );
}