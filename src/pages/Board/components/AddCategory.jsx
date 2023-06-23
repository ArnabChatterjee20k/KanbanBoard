import Card from "antd/es/card/Card";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function AddCategory() {
  return (
    <Button
    icon={<PlusOutlined/>}
    
    className="w-full px-8 my-2"
    //   bodyStyle={{ paddingBlock: "1rem", paddingInline: "2rem" }}
    >
      Create Card
    </Button>
  );
}
