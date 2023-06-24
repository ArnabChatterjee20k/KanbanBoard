import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useColumnStore } from "../store/columnStore";

export default function AddCategory() {
const { addColumn } = useColumnStore((state) => ({
    addColumn: state.addColumn,
    }));
  return (
    <Button onClick={()=>addColumn()} className="flex flex-col justify-center items-center p-8 border border-gray-300 rounded">
      <PlusOutlined />
      <p>Add Category</p>
    </Button>
  );
}
