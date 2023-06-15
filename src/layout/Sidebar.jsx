import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";

const items = ["Category1", "category2", "category3"].map((element, index) => ({
  key: String(index + 1),
  label: `nav ${element}`,
}));

export default function Sidebar() {
  return (
    <Sider breakpoint="lg" className="py-2 min-h-screen">
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
}
