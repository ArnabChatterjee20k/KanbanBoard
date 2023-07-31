import { useParams } from "react-router-dom";

export default function useBoardAdminDetails() {
  const { userId, boardId } = useParams();
  return { userId, boardId };
}
