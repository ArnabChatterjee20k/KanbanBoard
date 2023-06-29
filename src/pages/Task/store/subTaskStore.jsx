import { create } from "zustand";
import { devtools } from "zustand/middleware";
const subTasks = {
  1: {
    id: 1,
    content: "H",
    completed: false,
  },
  2: {
    id: 1,
    content: "e",
    completed: false,
  },
};
const subTaskStructure = (id, content) => {
  return { id, content, completed: false };
};
export const useSubTaskStore = create(
  devtools((set) => ({
    subTasks,
    createSubTasks: (id, content) => {
      set((state) => {
        return {
          subTasks: {
            ...state.subTasks,
            [id]: subTaskStructure(id, content),
          },
        };
      });
    },
    updateSubTasks: (id, content) => {
      set((state) => {
        return {subTasks:{
          ...state.subTasks,
          [id]: {
            ...state.subTasks[id],
            content,
          },
        }};
      });
    },
    toggleSubTasks: (id) => {
      set((state) => {
        return {
          subTasks: {
            ...state.subTasks,
            [id]: {
              ...state.subTasks[id],
              completed: !state.subTasks[id].completed,
            },
          },
        };
      });
    },
  }))
);
