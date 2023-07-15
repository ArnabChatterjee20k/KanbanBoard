import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../404/NotFound";
import Boards from "./components/Boards";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { userId } = useParams();
  if (!isLoaded) return <p>Loading....</p>;
  if (isLoaded && userId !== user.id) return <NotFound text="User Not Found" />;
  return <Boards/>;
}
