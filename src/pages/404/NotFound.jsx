import { Result } from "antd"

export default function NotFound({text}) {
  return <Result title="404" subTitle={text} status="404"/>
}
