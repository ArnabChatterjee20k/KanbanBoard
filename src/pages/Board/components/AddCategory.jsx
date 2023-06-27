import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useColumnStore } from "../store/columnStore";
import { useBoardStore } from "../../../store/boardStore";
import { useParams } from "react-router-dom";

export default function AddCategory() {
  const { boardId } = useParams();

  const { addColumn } = useColumnStore((state) => ({
    addColumn: state.addColumn,
  }));

  const addColumnToBoard = useBoardStore((state) => state.addColumn);
  const addNewCategory = () => {
    const colId = crypto.randomUUID();
    addColumn(colId);
    addColumnToBoard(boardId, colId);
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
