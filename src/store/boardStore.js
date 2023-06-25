import { create } from "zustand";

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

export const useBoardStore = create((set) => ({
  boards,
  addBoard: (id) => {
    set((state) => {
      return {
        boards: { ...state.boards, [id]: createBoard(id) },
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
}));
