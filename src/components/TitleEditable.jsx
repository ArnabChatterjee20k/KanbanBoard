import { Input } from "antd";
import Editable from "./Editable";

export default function TitleEditable({ currentText, isSubTitle, afterBlur }) {
  return <Editable InputComponent={Input} currentText={currentText} isSubTitle={isSubTitle} afterBlur={afterBlur}/>
}
