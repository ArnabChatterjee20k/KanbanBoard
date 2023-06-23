import { create } from "zustand";

const columns = {
  "column-1": {
    id: "column-1",
    title: "To do",
    taskIds: ["task-3", "task-4"],
  },
  "column-2": {
    id: "column-2",
    title: "InProgress",
    taskIds: ["task-1", "task-2"],
  },
  "column-3": {
    id: "column-3",
    title: "Done",
    taskIds: [],
  },
};

const columnsOrder = ["column-1", "column-2", "column-3" ];

export const useColumnStore = create((set, get) => ({
  columns: columns,
  columnsOrder: columnsOrder,
  reorderTask: (columnId, startIndex, endIndex) => {
    // debugger;
    set((state) => {
      const col = get().columns[columnId];
      const newTasks = [...col.taskIds];

      const [pickedTask] = newTasks.splice(startIndex, 1);

      newTasks.splice(endIndex, 0, pickedTask);

      const newCol = { ...col, taskIds: newTasks };

      return {
        ...get(),
        columns: {
          ...get().columns,
          [newCol.id]: newCol,
        },
      };
    });
  },
  moveTasks: (startColumnId, endColumnId, startIndex, endIndex) => {
    set((state) => {
      const startCol = get().columns[startColumnId];
      const endCol = get().columns[endColumnId];

      const startColTasks = [...startCol.taskIds];
      const endColTasks = [...endCol.taskIds];

      const [pickedTask] = startColTasks.splice(startIndex, 1);
      endColTasks.splice(endIndex, 0, pickedTask);

      //   debugger;
      return {
        ...get(),
        columns: {
          ...get().columns,
          [startCol.id]: {
            ...startCol,
            taskIds: [...startColTasks],
          },
          [endCol.id]: {
            ...endCol,
            taskIds: [...endColTasks],
          },
        },
      };
    });
  },
  reorderColumns: (startIndex, endIndex) => {
    set((state) => {
      const newColumnsOrder = [...get().columnsOrder];

      const [pickedColumn] = newColumnsOrder.splice(startIndex, 1);
      newColumnsOrder.splice(endIndex, 0, pickedColumn);

      return {
        ...get(),
        columnsOrder: [...newColumnsOrder] ,
      };
    });
  },
}));
