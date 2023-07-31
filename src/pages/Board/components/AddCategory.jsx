import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useColumnStore } from "../store/columnStore";
import { useBoardStore } from "../../../store/boardStore";
import api from "../../../api/API";
import useBoardAdminDetails from "../../../hooks/useGetBoardAdminDetails";
import useMessage from "antd/es/message/useMessage";

export default function AddCategory() {
  const { boardId, userId } = useBoardAdminDetails();
  const [message,contextHolder] = useMessage()
  const addColToBoard = useColumnStore((state) => state.addColumn);
  const updateColOrder = useBoardStore((state) => state.addColumn);
  const addNewCategory = async () => {
    try {
      message.loading("creating category")
      const colId = await api.addColumnToBoard(userId, boardId);
      if (colId) {
        message.success("column created")
        addColToBoard(colId, "Category");
        updateColOrder(colId, boardId);
      }
    } catch (error) {
      message.error("Some error occured")
    }
    finally{
      setTimeout(message.destroy,1000)
    }
  };
  return (
    <Button
      onClick={addNewCategory}
      className="flex flex-col justify-center items-center p-8 border border-gray-300 rounded"
    >
      {contextHolder}
      <PlusOutlined />
      <p>Add Category</p>
    </Button>
  );
}
