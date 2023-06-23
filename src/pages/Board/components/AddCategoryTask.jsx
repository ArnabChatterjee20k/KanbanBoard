import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTaskStore } from "../store/taskStore";
import { useColumnStore } from "../store/columnStore";

export default function AddCategory({ id }) {
  const { addTask } = useTaskStore((state) => ({
    addTask: state.addTask,
  }));

  const { addTaskToColumn } = useColumnStore((state) => ({
    addTaskToColumn: state.addTaskToColumn,
  }));

  function createTask() {
    const taskId = crypto.randomUUID();
    document.startViewTransition(() => {
      addTask(taskId, "catlsdfj");
      addTaskToColumn(id, taskId);
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
