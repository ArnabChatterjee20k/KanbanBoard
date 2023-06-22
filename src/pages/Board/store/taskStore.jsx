import { create } from "zustand";

const tasks = {
  "task-1": { id: "task-1", content: "Take out the garbage" },
  "task-2": { id: "task-2", content: "Watch my favorite show" },
  "task-3": { id: "task-3", content: "Charge my phone" },
  "task-4": { id: "task-4", content: "Cook dinner" },
};

export const useTaskStore = create((set, get) => ({
  tasks: tasks,
  getTask: () => {
    return get();
  },
  addTask: (id, content) => {
    set((state) => ({
      tasks: { [id]: { id, content }, ...state.tasks },
    }));
  },
}));
