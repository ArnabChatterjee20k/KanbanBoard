import { Layout, theme } from "antd";
import React from "react";
import HeadNav from "./HeadNav";
import Sidebar from "./Sidebar";
import { Content } from "antd/es/layout/layout";

const Navigation = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      <HeadNav />
      <Layout>
        <Sidebar />
        <Content className="p-8">{children}</Content>
      </Layout>
    </Layout>
  );
};
export default Navigation;
