import useFetcher from "../../../hooks/useFetcher";
import api from "../../../api/API";

export default function useGetBoard( user_id, board_db_id ) {
  return useFetcher(()=>api.verifyUserAndGetBoard(user_id, board_db_id), [
    user_id,
    board_db_id,
  ]);
}
