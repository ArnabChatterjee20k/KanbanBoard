import { Checkbox } from "antd";
import React from "react";
import { useSubTaskStore } from "../store/subTaskStore";
import EditableText from "./EditableText";

export default function SubTask({ id }) {
  const { subTask, toggleSubTasks } = useSubTaskStore((state) => ({
    subTask: state.subTasks[id],
    toggleSubTasks: state.toggleSubTasks,
  }));
  return (
    <div className="flex gap-2">
      <Checkbox
        checked={subTask.completed}
        onChange={() => toggleSubTasks(id)}
      />
      <EditableText id={id}/>
    </div>
  );
}
