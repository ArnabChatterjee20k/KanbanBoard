import Modal from "antd/es/modal/Modal";
import { useColumnStore } from "../../Board/store/columnStore";
import { useParams } from "react-router-dom";
import NotFound from "../../404/NotFound";

export default function ColumnView() {
  const columns = useColumnStore((state) => state.columns);
  const { columnId } = useParams();

  const column = columns[columnId];
  if (!column) return <ColumnNotFound />;

  return <Modal title="Title" open={true} okText="Save"></Modal>;
}

function ColumnNotFound() {
  return (
    <Modal open={true} footer={null}>
      <NotFound text="Column Not Found" />
    </Modal>
  );
}
