import { Spin } from "antd";

export default function Loader({ message }) {
  return (
    <Spin tip={message || "Loading"} size="large">
      <div className="content" />
    </Spin>
  );
}
