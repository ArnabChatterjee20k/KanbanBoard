import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useBoardStore } from "../store/boardStore";
import { useNavigate } from "react-router-dom";

export default function CreateBoard() {
  const addBoard = useBoardStore((state) => state.addBoard);
  const redirect = useNavigate();

  function createAndRedirectNewBoard() {
    const id = crypto.randomUUID();
    addBoard(id);
    redirect(`/board/${id}`);
  }
  return (
    <div className="flex justify-between items-center px-4 my-2">
      <p className="text-white text-base">Boards</p>
      <Button
        icon={<PlusOutlined className="text-white" />}
        onClick={createAndRedirectNewBoard}
      />
    </div>
  );
}
