import { Header } from "antd/es/layout/layout";
import Logo from "../components/Logo";
import { UserButton } from "@clerk/clerk-react";
export default function HeadNav() {
  return (
    <>
      <Header className="flex px-2 items-center justify-between">
        <Logo />
        <UserButton />
      </Header>
    </>
  );
}
