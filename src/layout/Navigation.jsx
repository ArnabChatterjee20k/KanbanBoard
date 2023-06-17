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
      <Content>
        <Layout>
          <Sidebar />
          <Layout className="flex flex-row justify-center">{children}</Layout>
        </Layout>
      </Content>
    </Layout>
  );
};
export default Navigation;
