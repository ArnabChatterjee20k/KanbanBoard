import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { useBoardStore } from "../store/boardStore";
import { Link, useMatch } from "react-router-dom";
import CreateBoard from "../components/createBoard";

export default function Sidebar() {
  const boards = useBoardStore((state) => state.boards);

  const newItems = boards?.map((board) => {
    const [id, details] = Object.entries(board)[0];
    return { key: id, label: <Link to={`/board/${id}`}>{details?.title}</Link> };
  });

  const {
    params: { id },
  } = useMatch("/board/:id");

  return (
    <Sider breakpoint="lg" className="py-2 min-h-screen">
      <CreateBoard/>
      <Menu theme="dark" mode="inline" items={newItems} selectedKeys={[id]} />
    </Sider>
  );
}
