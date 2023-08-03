import { useRef } from "react";
import api from "../api/API";
import useFetcher from "../hooks/useFetcher";
import { useColumnStore } from "../pages/Board/store/columnStore";

export default function useGetAllCols(board_id, user_id) {
  const setCols = useColumnStore((state) => state.setCols);
  const cols = useColumnStore((state) => state.columns);
  const cache = useRef(new Map());
  const key = `${user_id}/${board_id}`;
  async function queryFunc() {
    if (!cache.current.has(key)) {
      cache.current.set(key, "fetched");
      const columns = await api.fetchAllColumns(user_id, board_id);
      console.log(
        "🚀 ~ file: useGetAllCols.jsx:11 ~ queryFunc ~ columns:",
        columns
      );
      setCols(columns);
      return columns;
    }
    return cols;
  }
  return useFetcher(queryFunc, [user_id, board_id]);
}
