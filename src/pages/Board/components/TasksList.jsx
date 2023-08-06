import { List } from "antd";
import TaskCard from "./TaskCard";
import AddCategory from "./AddCategoryTask";
import { useColumnStore } from "../store/columnStore";
import { useTaskStore } from "../store/taskStore";
import TitleEditable from "../../../components/TitleEditable";
import api from "../../../api/API";
import useMessage from "antd/es/message/useMessage";

export default function TasksList({ id }) {
  const [message, messageHolder] = useMessage();
  const { columns, updateColumnTitle } = useColumnStore((state) => ({
    columns: state.columns,
    updateColumnTitle: state.updateColumnTitle,
  }));

  const currentColumn = columns[id];
  const orderedTasks = columns[id]?.taskIds;
  const { tasks } = useTaskStore((state) => ({
    tasks: state.tasks,
  }));

  // console.log({currentColumn});
  async function handleNewColumnTitle(title) {
    const prevTitle = currentColumn.title;
    updateColumnTitle(id, title);
    // debugger
    api.updateColumnTitle(id, title).catch(() => {
      updateColumnTitle(id, prevTitle);
      message.error("Some problems occured while changing the column title");
      setTimeout(() => {
        message.destroy();
      }, 3000);
    });
  }
  if (currentColumn)
    return (
      <>
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
          {messageHolder}
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
      </>
    );
}
