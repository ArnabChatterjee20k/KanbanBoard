import React from "react";
import TaskView from "./components/TaskView";
import BackButton from "./components/BackButton";
import TitleEditable from "../../components/TitleEditable";
import DescriptionEditable from "../../components/DescriptionEditable";
import { useTaskStore } from "../Board/store/taskStore";
import { useParams } from "react-router-dom";

export default function Task() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskTitle = useTaskStore(state=>state.updateTaskContent)
  const updateTaskDescription = useTaskStore(state=>state.updateTaskDescription)
  const { taskId } = useParams();
  const task = tasks[taskId];

  return (
    <section className="p-4">
      <BackButton />
      <div className="flex flex-col items-start gap-4 m-auto max-w-[1024px] px-16 py-6">
        <TitleEditable currentText={task.content} afterBlur={(content)=>updateTaskTitle(taskId,content)}/>
        <DescriptionEditable
          currentText={task.description || "Add Your Description"}
          isSubTitle
          afterBlur={(content)=>updateTaskDescription(taskId,content)}
        />
        <TaskView task={task} />
      </div>
    </section>
  );
}
