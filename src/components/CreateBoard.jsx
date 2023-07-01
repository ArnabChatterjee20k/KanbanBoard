import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useBoardStore } from "../store/boardStore";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import api from "../api/API";
import useMessage from "../hooks/useMessage";

export default function CreateBoard() {
  const addBoard = useBoardStore((state) => state.addBoard);
  const redirect = useNavigate();
  const { user } = useUser();
  const [{ success, error, loading,destroy },contextHolder] = useMessage();

  async function createAndRedirectNewBoard() {
    const id = crypto.randomUUID();
    const loadId = loading("Creating board");
    try {
      await api.createBoard(user.id, "new board", id);
      success("Board Created");
      addBoard(id);
      redirect(`/board/${id}`);
    } catch (e) {
      error("Some Problem Occured!");
      // error(e.message);
    }
    setTimeout(destroy,2000)
  }
  return (
    <div className="flex justify-between items-center px-4 my-2">
      {contextHolder}
      <p className="text-white text-base">Boards</p>
      <Button
        icon={<PlusOutlined className="text-white" />}
        onClick={createAndRedirectNewBoard}
      />
    </div>
  );
}
