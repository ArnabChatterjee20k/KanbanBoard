import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTaskStore } from "../store/taskStore";
import { useColumnStore } from "../store/columnStore";
import { useNavigate } from "react-router";
import api from "../../../api/API";
import useBoardAdminDetails from "../../../hooks/useGetBoardAdminDetails"
import useMessage from "antd/es/message/useMessage";

export default function AddCategory({ id }) {
  const { addTask } = useTaskStore((state) => ({
    addTask: state.addTask,
  }));

  const {boardId} = useBoardAdminDetails()
  const { addTaskToColumn } = useColumnStore((state) => ({
    addTaskToColumn: state.addTaskToColumn,
  }));

  const [message,messageHolder] = useMessage()

  const nav = useNavigate()

  async function createTask() {
    const taskId = crypto.randomUUID();
    addTask(taskId, "new task");
    document.startViewTransition(() => {
      addTaskToColumn(id, taskId);
    });
    await api.addTaskToCol(id,boardId,taskId)
  }

  return (
    <Button
      onClick={createTask}
      icon={<PlusOutlined />}
      className="w-full px-8 my-2"
      //   bodyStyle={{ paddingBlock: "1rem", paddingInline: "2rem" }}
    >
      {messageHolder}
      Create Card
    </Button>
  );
}
