import { message } from "antd";

export default function useMessage() {
  const [messageApi, contextHolder] = message.useMessage();
  const template = (type, message) => {
    messageApi.open({
      type: type,
      content: message,
      duration: 0,
    });
  };

  const success = (message) => template("success", message);
  const error = (message) => template("error", message);
  const loading = (message) => template("loading", message);

  const destroy = () => messageApi.destroy();
  return [
    {
      success,
      error,
      loading,
      destroy
    },
    contextHolder,
  ];
}
