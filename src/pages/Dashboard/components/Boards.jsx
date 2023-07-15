import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import useGetAllBoards from "../../../services/useGetAllBoards";
import BoardCard from "./BoardCard";
import { Card, Grid } from "antd";

export default function Boards() {
  const { userId } = useParams();
  const { boards, isError, isLoading } = useGetAllBoards(userId);
  if (isLoading) return <Loader message="Fetching Boards..." />;
  return (
    <section className="grid m-auto p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Object.entries(boards).map(([key, { title, board_id }]) => (
        <BoardCard board_id={board_id} boardTitle={title} key={board_id} />
      ))}
    </section>
  );
}
