import { useRef } from "react";
import api from "../api/API";
import useFetcher from "../hooks/useFetcher";
import { useTaskStore } from "../pages/Board/store/taskStore";

export default function useGetAllTasks( board_id ) {
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const cache = useRef(new Map());
  const key = board_id;
  async function queryFunc() {
    if (!cache.current.has(key)) {
      cache.current.set(key, "fetched");
      const fetchedTasks = await api.fetchAllTasks( board_id);
      console.log({fetchedTasks});
      setTasks(fetchedTasks);
      console.log({tasks});
      return fetchedTasks;
    }
    return tasks;
  }
  return useFetcher(queryFunc, [board_id]);
}
