import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";

export default function BackButton({ title }) {
  return (
      <Button className="w-fit m-4" icon={<ArrowLeftOutlined />}>
        {title || "Back"}
      </Button>
  );
}
