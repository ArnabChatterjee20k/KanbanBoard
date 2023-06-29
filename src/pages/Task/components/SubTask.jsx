import { Checkbox } from "antd";
import React from "react";
import { useSubTaskStore } from "../store/subTaskStore";

export default function SubTask({ id }) {
  const { subTask, toggleSubTasks } = useSubTaskStore((state) => ({
    subTask: state.subTasks[id],
    toggleSubTasks: state.toggleSubTasks,
  }));
  return (
    <Checkbox checked={subTask.completed} onChange={() => toggleSubTasks(id)}>
      <p
        className={`${
          subTask.completed && "line-through text-gray-400"
        } text-base`}
      >
        {subTask.content}
      </p>
    </Checkbox>
  );
}
