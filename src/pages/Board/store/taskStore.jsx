import { create } from "zustand";

const tasks = {
  "task-1": {
    id: "task-1",
    content: "Take out the garbage",
    description: "",
    subTasks: [],
  },
  "task-2": {
    id: "task-2",
    content: "Watch my favorite show",
    description: "",
    subTasks: [],
  },
  "task-3": {
    id: "task-3",
    content: "Charge my phone",
    description: "",
    subTasks: [],
  },
  "task-4": {
    id: "task-4",
    content: "Cook dinner",
    description: "",
    subTasks: [1, 2],
  },
};

export const useTaskStore = create((set, get) => ({
  tasks: {},
  setTasks: (newTasks) => {
    const tasks = newTasks.reduce((prev, task) => {
      prev[task.$id] = task;
      return prev;
    }, {});
    set({ tasks });
  },
  getTask: () => {
    return get();
  },
  addTask: (id, content) => {
    set((state) => ({
      tasks: { [id]: { id, content, subTasks: [] }, ...state.tasks },
    }));
  },
  addSubTask: (taskId, subTaskId) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          subTasks: [...state.tasks[taskId].subTasks, subTaskId],
        },
      },
    }));
  },
  updateTaskContent: (taskId, content) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          content,
        },
      },
    }));
  },
  updateTaskDescription: (taskId, description) => {
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: {
          ...state.tasks[taskId],
          description,
        },
      },
    }));
  },
}));
