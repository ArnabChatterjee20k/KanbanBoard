import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useColumnStore } from "../store/columnStore";
import { useBoardStore } from "../../../store/boardStore";
import api from "../../../api/API";
import useBoardAdminDetails from "../../../hooks/useGetBoardAdminDetails";

export default function AddCategory() {
  const { boardId, userId } = useBoardAdminDetails();
  const addColToBoard = useColumnStore((state) => state.addColumn);
  const updateColOrder = useBoardStore((state) => state.addColumn);
  const addNewCategory = async () => {
    const colId = await api.addColumnToBoard(userId,boardId);
    if(colId){
      addColToBoard(colId, boardId);
      updateColOrder(colId, boardId);
    }
  };
  return (
    <Button
      onClick={addNewCategory}
      className="flex flex-col justify-center items-center p-8 border border-gray-300 rounded"
    >
      <PlusOutlined />
      <p>Add Category</p>
    </Button>
  );
}
