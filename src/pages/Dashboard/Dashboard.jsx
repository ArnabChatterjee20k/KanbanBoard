import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../404/NotFound";
import Boards from "./components/Boards";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const nav = useNavigate();
  const { userId } = useParams();
  if (!isLoaded) return <p>Loading....</p>;
  const link = `/user/${user.id}`;
  if (isLoaded && userId !== user.id)
    return (
      <NotFound text="Access Denied!" status="403">
        <Button className="w-fit m-auto" onClick={() => nav(link)} icon={<LogoutOutlined />}>
          My DashBoard
        </Button>
      </NotFound>
    );
  return <Boards />;
}
