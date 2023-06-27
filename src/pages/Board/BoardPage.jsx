import Board from "./components/Board";
import Sidebar from "../../layout/Sidebar";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "../404/NotFound";
import { useBoardStore } from "../../store/boardStore";

export default function BoardPage() {
  const { boardId } = useParams();
  const { boards } = useBoardStore((state) => ({
    boards: state.boards,
  }));

  const board = boards[boardId];

  if (!board) return <NotFound text={"Board Not Found"} />;
  return (
    <>
      <Outlet />
      <Sidebar />
      <Content className="p-8">
        <Board board={board} />
      </Content>
    </>
  );
}
