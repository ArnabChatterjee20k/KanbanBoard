import { create } from "zustand";
import api from "../api/API";
// import { devtools } from "zustand/middleware";

const boards = {
  1: {
    id: 1,
    title: "new board",
    columns: ["column-1"],
  },
};

const createBoard = (id) => {
  return {
    id,
    title: "new board",
    order: [],
  };
};

export const useBoardStore = create((set, get) => ({
  boards: {},
  isLoading: false,
  isError: false,
  error: null,
  setBoard: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await api.getAllBoards(userId);
      const boards = res.reduce((newBoards, board) => {
        newBoards[board.$id] = board;
        return newBoards;
      }, {});
      set({ boards, isLoading: false });
    } catch (error) {
      set({ error, isError: true });
    }
  },

  addBoard: (id) => {
    set((state) => {
      return {
        boards: { ...state.boards, [id]: createBoard(id) },
      };
    });
  },
  updateBoard: (id, title) => {
    set((state) => {
      return {
        boards: {
          ...state.boards,
          [id]: {
            ...state.boards[id],
            title,
          },
        },
      };
    });
  },
  addColumn: async (col_id, board_db_id) => {
    console.log(get().boards[board_db_id].order);
    set((state) => {
      return {
        boards: {
          ...state.boards,
          [board_db_id]: {
            ...state.boards[board_db_id],
            order: [...state.boards[board_db_id].order, col_id],
          },
        },
      };
    });
  },
  reorderColumns: (boardId, startIndex, endIndex) => {
    set((state) => {
      const board = state.boards[boardId];
      const newColumnsOrder = [...board.columns];

      const [pickedColumn] = newColumnsOrder.splice(startIndex, 1);
      newColumnsOrder.splice(endIndex, 0, pickedColumn);

      return {
        boards: {
          ...state.boards,
          [boardId]: {
            ...state.boards[boardId],
            columns: newColumnsOrder,
          },
        },
      };
    });
  },
}));
