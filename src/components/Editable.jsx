import { Input } from "antd";
import { useState } from "react";

export default function Editable({
  InputComponent,
  currentText,
  isSubTitle,
  afterBlur,
}) {
  const [text, setText] = useState(currentText || "Undefined");
  const [edit, setEdit] = useState(false);
  function handleChange(value) {
    setText(value);
  }

  function handleBlur() {
    setEdit(false);
    setText(text || "Undefined");
    if (afterBlur) afterBlur(text || "Undefined");
  }

  if (edit)
    return (
      <InputComponent
        autoFocus={true}
        placeholder="Title"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
      />
    );
  return (
    <h3
      className={`${!isSubTitle ? "text-2xl" : "text-base"} cursor-pointer`}
      onClick={() => setEdit(true)}
    >
      {text}
    </h3>
  );
}
