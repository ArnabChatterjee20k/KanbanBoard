import { Layout, theme } from "antd";
import React from "react";
import HeadNav from "./HeadNav";

const Navigation = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      <HeadNav />
      <Layout>
        {children}
      </Layout>
    </Layout>
  );
};
export default Navigation;
