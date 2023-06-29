import Board from "./components/Board";
import Sidebar from "../../layout/Sidebar";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "../404/NotFound";
import { useBoardStore } from "../../store/boardStore";
import TitleEditable from "../../components/TitleEditable";

export default function BoardPage() {
  const { boardId } = useParams();
  const { boards, updateBoard } = useBoardStore((state) => ({
    boards: state.boards,
    updateBoard: state.updateBoard,
  }));

  const board = boards[boardId];

  if (!board) return <NotFound text={"Board Not Found"} />;

  function handleBoardTitle(title) {
    updateBoard(boardId, title);
  }

  return (
    <>
      <Outlet />
      <Sidebar />
      <Content className="p-4">
        <div className="mb-4">
          {/* why key? since we are using it at the board page level. So only one component is their. Now change in one will cause trigger the change in other board as well. So key will destroy it and rebuild again so that their is a distinguishion*/}
          <TitleEditable
            currentText={board.title}
            afterBlur={handleBoardTitle}
            key={boardId}
          />
        </div>
        <Board board={board} />
      </Content>
    </>
  );
}
