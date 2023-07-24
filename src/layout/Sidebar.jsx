import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { Link, useParams } from "react-router-dom";
import CreateBoard from "../components/createBoard";
import useGetAllBoards from "../services/useGetAllBoards";

export default function Sidebar() {
  const {
    userId,boardId
  } = useParams();

  const {boards} = useGetAllBoards(userId)
  const newItems = Object.entries(boards)?.map(([id,details]) => {
    return { key: id, label: <Link to={`/user/${userId}/board/${id}`}>{details?.title}</Link> };
  });
  
  return (
    <Sider breakpoint="lg" className="py-2 min-h-screen">
      <CreateBoard/>
      <Menu theme="dark" mode="inline" items={newItems} selectedKeys={[boardId]} />
    </Sider>
  );
}
