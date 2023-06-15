import { Header } from "antd/es/layout/layout";
import Logo from "../components/Logo";
export default function HeadNav() {
  return (
    <>
      <Header className="flex px-2 items-center">
        <Logo />
      </Header>
    </>
  );
}
