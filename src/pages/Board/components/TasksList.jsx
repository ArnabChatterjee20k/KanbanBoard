import { List } from "antd";
import TaskCard from "./TaskCard";
import AddCategory from "./AddCategory";
import { useColumnStore } from "../store/columnStore";
import { useTaskStore } from "../store/taskStore";

export default function TasksList({id}) {
  const { columns } = useColumnStore((state) => ({
    columns: state.columns,
  }));
  const currentColumn = columns[id];
  const orderedTasks = columns[id].taskIds;
  const {tasks} = useTaskStore(state=>({
    tasks:state.tasks
  }))
  return (
    <List
      className="bg-white shadow-sm p-2 min-w-[200px]"
      bordered
      header={<h1 className="text-2xl">{currentColumn.title}</h1>}
    >
      {orderedTasks.length
        ? orderedTasks.map((taskId, i) => (
            <TaskCard
              index={i}
              key={taskId}
              item={tasks[taskId].content}
              id={taskId}
            />
          ))
        : null}
      <AddCategory />
    </List>
  );
}
