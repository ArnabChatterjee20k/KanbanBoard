import { useBoardStore } from "../store/boardStore";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import api from "../api/API";
import useMessage from "../hooks/useMessage";

export default function useCreateAndRedirectToNewBoard() {
  const addBoard = useBoardStore((state) => state.addBoard);
  const redirect = useNavigate();
  const { user } = useUser();
  const [{ success, error, loading, destroy }, contextHolder] = useMessage();

  return [
    async () => {
      const id = crypto.randomUUID();
      const loadId = loading("Creating board");
      try {
        const res = await api.createBoard(user.id, "new board", id);
        console.log(res);
        success("Board Created");
        //   addBoard(id);
        //   redirect(`board/${id}`);
      } catch (e) {
        error("Some Problem Occured!");
        // error(e.message);
      }
      setTimeout(destroy, 2000);
    },
    contextHolder,
  ];
}
