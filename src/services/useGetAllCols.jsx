import { useEffect } from "react";
import { useBoardStore } from "../store/boardStore";

export default function useGetAllCols(board_id) {
  const { setBoards, isLoading, isError, boards, error } = useBoardStore(
    (state) => {
      return {
        setBoards: state.setBoard,
        boards: state.boards,
        isLoading: state.isLoading,
        isError: state.isError,
        error: state.error,
      };
    }
  );

  useEffect(() => {
    if(Object.keys(boards).length===0){
      setBoards(userId);
    }
  }, [userId]);

  return { boards, isError, isLoading };
}
