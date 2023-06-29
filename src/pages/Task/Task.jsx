import React from "react";
import TaskView from "./components/TaskView";
import BackButton from "./components/BackButton";
import TitleEditable from "../../components/TitleEditable";
import DescriptionEditable from "../../components/DescriptionEditable";
import { useTaskStore } from "../Board/store/taskStore";
import { useParams } from "react-router-dom";

export default function Task() {
  const tasks = useTaskStore((state) => state.tasks);
  const { taskId } = useParams();
  const task = tasks[taskId];

  return (
    <section className="p-4">
      <BackButton />
      <div className="flex flex-col items-start gap-4 m-auto max-w-[1024px] px-16 py-6">
        <TitleEditable currentText={task.content} />
        <DescriptionEditable
          currentText={task.description || "Add Your Description"}
          isSubTitle
        />
        <TaskView task={task} />
      </div>
    </section>
  );
}
