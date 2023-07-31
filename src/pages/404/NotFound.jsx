import { Result } from "antd";

export default function NotFound({ text, status, children }) {
  return (
    <Result title={status || "404"} subTitle={text} status={status || "404"}>
      <div className="flex justify-center">
        {children}
      </div>
    </Result>
  );
}
