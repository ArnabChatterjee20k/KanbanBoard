import { Input } from "antd";
import { useState } from "react";
import { useSubTaskStore } from "../store/subTaskStore";

export default function EditableText({ id }) {
  const { subTask, updateSubTasks } = useSubTaskStore((state) => ({
    subTask: state.subTasks[id],
    updateSubTasks: state.updateSubTasks,
  }));
  const currentText = subTask.content
  const checked = subTask.completed

  const [text, setText] = useState(currentText || "Undefined");
  const [edit, setEdit] = useState(false);
  function handleChange(value) {
    setText(value);
  }

  function handleBlur() {
    setEdit(false);
    setText(text || "Undefined");
    updateSubTasks(id,text || "Undefined");
  }

  if (edit)
    return (
      <Input
        autoFocus={true}
        placeholder="Title"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
      />
    );
  return (
    <p
      className={`${checked && "line-through text-gray-300"} "text-base"`}
      onClick={() => setEdit(true)}
    >
      {text}
    </p>
  );
}
