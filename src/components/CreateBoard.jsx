import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useCreateAndRedirectToNewBoard from "../hooks/useCreateAndRedirectToNewBoard";

export default function CreateBoard() {
  const [createAndRedirectNewBoard, messageHolder] =
    useCreateAndRedirectToNewBoard();
  return (
    <div className="flex justify-between items-center px-4 my-2">
      {messageHolder}
      <p className="text-white text-base">Boards</p>
      <Button
        icon={<PlusOutlined className="text-white" />}
        onClick={createAndRedirectNewBoard}
      />
    </div>
  );
}