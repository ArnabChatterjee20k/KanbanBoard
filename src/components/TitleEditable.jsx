import { Input } from "antd";
import { useState } from "react";

export default function TitleEditable({ currentText, isSubTitle, afterBlur }) {
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
      <Input
        autoFocus={true}
        placeholder="Title"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
      />
    );
  return (
    <h3
      className={`${!isSubTitle ? "text-xl" : ""}`}
      onClick={() => setEdit(true)}
    >
      {text}
    </h3>
  );
}
