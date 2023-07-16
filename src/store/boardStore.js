import { create } from "zustand";
import api from "../api/API";
import { devtools } from "zustand/middleware";

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
    columns: [],
  };
};

export const useBoardStore = create(devtools((set) => ({
  boards: {},
  isLoading: false,
  isError: false,
  error: null,
  setBoard: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await api.getAllBoards(userId);
      console.log({res});
      const boards = res.reduce((newBoards, board) => {
        newBoards[board.board_id] = board;
        return newBoards
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
  addColumn: (boardId, colId) => {
    set((state) => {
      return {
        boards: {
          ...state.boards,
          [boardId]: {
            ...state.boards[boardId],
            columns: [...state.boards[boardId].columns, colId],
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
})));
