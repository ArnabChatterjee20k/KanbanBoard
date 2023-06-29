import AddSubTaskButton from "./AddSubTaskButton";
import SubTask from "./SubTask";

export default function TaskView({ task }) {
  const { subTasks } = task;

  return (
    <div>
      <div className="flex items-center gap-3 mt-4">
        <h4 className="text-xl font-bold">SubTasks</h4>
        <AddSubTaskButton taskId={task.id}/>
      </div>
      <div className="flex flex-col my-3">
        {subTasks.map((id) => (
          <SubTask id={id} key={id}/>
        ))}
      </div>
    </div>
  );
}
