import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useNavigate } from "react-router-dom";

export default function BackButton({ title }) {
  const nav = useNavigate()
  function goBack(){
    nav(-1)
  }
  return (
      <Button className="w-fit m-4" icon={<ArrowLeftOutlined />} onClick={goBack}>
        {title || "Back"}
      </Button>
  );
}
