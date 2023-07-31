import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
const { Meta } = Card;

export default function BoardCard({ boardTitle,board_id }) {
  const { isLoaded, user } = useUser();
  const avatar = user?.profileImageUrl;
  return (
    <Card
    hoverable={true}
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />
      ]}
    >
      <Meta
        avatar={<Avatar src={avatar} />}
        title={<Link className="hover:text-[#52c41a]" to={`board/${board_id}`}>{boardTitle}</Link>}
        description="This is the description"
      />
    </Card>
  );
}