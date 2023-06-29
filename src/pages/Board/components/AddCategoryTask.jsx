import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTaskStore } from "../store/taskStore";
import { useColumnStore } from "../store/columnStore";
import { useNavigate } from "react-router";

export default function AddCategory({ id }) {
  const { addTask } = useTaskStore((state) => ({
    addTask: state.addTask,
  }));

  const { addTaskToColumn } = useColumnStore((state) => ({
    addTaskToColumn: state.addTaskToColumn,
  }));

  const nav = useNavigate()

  function createTask() {
    const taskId = crypto.randomUUID();
    addTask(taskId, "new task");
    document.startViewTransition(() => {
      addTaskToColumn(id, taskId);
      nav(`/tasks/${taskId}`)
    });
  }

  return (
    <Button
      onClick={createTask}
      icon={<PlusOutlined />}
      className="w-full px-8 my-2"
      //   bodyStyle={{ paddingBlock: "1rem", paddingInline: "2rem" }}
    >
      Create Card
    </Button>
  );
}
