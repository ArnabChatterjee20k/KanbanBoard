import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import useGetAllBoards from "../../../services/useGetAllBoards";
import BoardCard from "./BoardCard";
import { Empty, Button } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import useCreateAndRedirectToNewBoard from "../../../hooks/useCreateAndRedirectToNewBoard";

export default function Boards() {
  const { userId } = useParams();
  const { boards, isError, isLoading } = useGetAllBoards(userId);
  if (isLoading) return <Loader message="Fetching Boards..." />;
  if (boards.length === 0) return <EmptyBoard />;
  else return (
    <section className="grid m-auto p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Object.entries(boards).map(([key, { title, $id }]) => (
        <BoardCard board_id={$id} boardTitle={title} key={$id} />
      ))}
    </section>
  );
}

function EmptyBoard() {
  const [createAndRedirectNewBoard, messageHolder] =
    useCreateAndRedirectToNewBoard();
  return (
    <>
      {messageHolder}
      <Empty
        className="my-auto flex flex-col justify-center items-center"
        imageStyle={{
          height: 100,
        }}
        description={<span className="text-2xl">No Boards!</span>}
      >
        <Button
          className="bg-blue-600"
          type="primary"
          icon={<FolderAddOutlined />}
          onClick={createAndRedirectNewBoard}
        >
          Create Now
        </Button>
      </Empty>
    </>
  );
}
