import React from "react";
import Editable from "./Editable";
import TextArea from "antd/es/input/TextArea";

export default function DescriptionEditable({
  currentText,
  isSubTitle,
  afterBlur,
}) {
  return (
    <Editable
      InputComponent={TextArea}
      currentText={currentText}
      isSubTitle={isSubTitle}
      afterBlur={afterBlur}
    />
  );
}
