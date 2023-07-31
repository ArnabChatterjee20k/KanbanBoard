import { List } from "antd";
import TaskCard from "./TaskCard";
import AddCategory from "./AddCategoryTask";
import { useColumnStore } from "../store/columnStore";
import { useTaskStore } from "../store/taskStore";
import TitleEditable from "../../../components/TitleEditable";
import useGetAllCols from "../../../services/useGetAllCols";
import Loader from "../../../components/Loader";
export default function TasksList({ id }) {
  const { columns, updateColumnTitle } = useColumnStore((state) => ({
    columns: state.columns,
    updateColumnTitle: state.updateColumnTitle,
  }));

  const currentColumn = columns[id];
  const orderedTasks = columns[id]?.taskIds;
  const { tasks } = useTaskStore((state) => ({
    tasks: state.tasks,
  }));

  function handleNewColumnTitle(title) {
    updateColumnTitle(id, title);
  }

  if(currentColumn) return (
    <List
      className="bg-white shadow-sm p-2 min-w-[200px]"
      bordered
      header={
        currentColumn ? (
          <TitleEditable
            afterBlur={handleNewColumnTitle}
            currentText={currentColumn?.title}
          />
        ) : null
      }
    >
      {orderedTasks?.length
        ? orderedTasks.map((taskId, i) => (
            <TaskCard
              index={i}
              key={taskId}
              item={tasks[taskId].content}
              id={taskId}
            />
          ))
        : null}
      <AddCategory disabled={!currentColumn} id={id} />
    </List>
  );
}
