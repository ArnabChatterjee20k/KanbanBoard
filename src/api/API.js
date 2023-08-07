import { Client, Databases, ID, Query } from "appwrite";
import config from "./config";
import {
  badAuthError,
  notFoundError,
  someProblemsOccured,
} from "../utils/errors";

class API {
  constructor() {
    const client = new Client()
      .setEndpoint(config.endpoint)
      .setProject(config.proj);

    this.db = new Databases(client);
    this.dbId = config.db;

    this.boardsId = config.boards;
    this.colId = config.cols;
    this.taskId = config.tasks;
  }

  async getAllBoards(userId) {
    try {
      const res = await this.db.listDocuments(this.dbId, this.boardsId, [
        Query.equal("user_id", [userId]),
      ]);
      return res.documents;
    } catch (error) {
      throw new Error({ cause: error });
    }
  }

  async createBoard(user_id, title, board_id) {
    try {
      const response = await this.db.createDocument(
        this.dbId,
        this.boardsId,
        ID.unique(),
        {
          title,
          board_id,
          user_id,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async verifyUserAndGetBoard(user_id, board_db_id) {
    const res = await this.db.getDocument(
      this.dbId,
      this.boardsId,
      board_db_id,
      [Query.equal("user_id", user_id)]
    );
    if (res === null) return { auth: false, boardDetails: null };
    return { auth: true, boardDetails: res };
  }

  async updateBoardTitle(board_db_id, user_id, newTitle) {
    const res = await this.verifyUserAndGetBoard(user_id, board_db_id);
    if (res.auth) {
      const { title } = res.boardDetails;
      if (
        newTitle !== null &&
        newTitle.trim() !== "" &&
        title.trim() !== newTitle.trim()
      ) {
        await this.db.updateDocument(this.dbId, this.boardsId, board_db_id, {
          title: newTitle,
        });
      }
    } else throw new Error({ cause: "Access Denied" });
  }

  async addColumnToBoard(user_id, board_db_id) {
    const { auth, boardDetails } = await this.verifyUserAndGetBoard(
      user_id,
      board_db_id
    );
    if (auth) {
      const { order } = boardDetails;
      const col_id = await this.#addColumn(board_db_id);
      await this.db.updateDocument(this.dbId, this.boardsId, board_db_id, {
        order: [...order, col_id],
      });
      return col_id;
    }
    throw badAuthError();
  }

  async #addColumn(board_db_id) {
    const res = await this.db.createDocument(
      this.dbId,
      this.colId,
      ID.unique(),
      { title: "Category", board_id: board_db_id }
    );
    return res.$id;
  }

  async fetchAllColumns(user_id, board_db_id) {
    const { auth, boardDetails } = await this.verifyUserAndGetBoard(
      user_id,
      board_db_id
    );
    try {
      if (auth) {
        const cols = await this.db.listDocuments(this.dbId, this.colId, [
          Query.equal("board_id", [board_db_id]),
        ]);
        return cols.documents;
      }
      throw badAuthError();
    } catch (error) {
      console.log({ error, board_db_id });
    }
  }

  async fetchColumn(user_id, board_db_id, col_id) {
    const { auth, boardDetails } = await this.verifyUserAndGetBoard(
      user_id,
      board_db_id
    );
    if (auth) {
      return await this.db.getDocument(this.dbId, this.colId, col_id);
    }
    throw badAuthError();
  }

  reOrderCol() {
    const recentColumn = { current: [] };
    const db = this.db;
    const dbId = this.dbId;
    const boardsId = this.boardsId;

    // Use closure to share timeoutId among all instances of reOrderColDriver
    let timeoutId;

    async function reOrderColDriver(board_db_id, newOrder) {
      return new Promise((resolve, reject) => {
        recentColumn.current = newOrder;

        // Clear previous timeout (if any) to avoid multiple calls to updateDocument
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Set a new timeout for 2000 ms
        timeoutId = setTimeout(async () => {
          try {
            if (recentColumn.current?.length !== 0) {
              const res = await db.updateDocument(dbId, boardsId, board_db_id, {
                order: newOrder,
              });
              console.log({ res });
              resolve(res); // Resolve the Promise with the result
            } else {
              // If there's nothing to update, resolve the Promise with null or an appropriate value
              resolve(null);
            }
          } catch (error) {
            reject(error); // Reject the Promise with the error
          }
        }, 3000);
      });
    }

    return reOrderColDriver;
  }

  async updateColumnTitle(col_id, newTitle) {
    try {
      return await this.db.updateDocument(this.dbId, this.colId, col_id, {
        title: newTitle,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addTaskToCol(col_id, board_db_id,provided_task_id) {
    const [task, col] = await Promise.allSettled([
      this.#addTask(col_id, board_db_id,provided_task_id),
      this.db.getDocument(this.dbId, this.colId, col_id),
    ]);
    if (task.status === "rejected" || col.status === "rejected") {
      throw someProblemsOccured();
    }

    const taskId = task.value;
    const taskOrder = col.value.task_order;

    return await this.db.updateDocument(this.dbId, this.colId, col_id, {
      task_order: [...taskOrder, taskId],
    });
  }
  async #addTask(col_id, board_db_id,provided_task_id) {
    const task = await this.db.createDocument(
      this.dbId,
      this.taskId,
      provided_task_id,
      {
        title: "New Task",
        col_id,
        board_id: board_db_id,
      }
    );

    return task.$id;
  }

  async fetchAllTasks(board_db_id) {
    const tasks = await this.db.listDocuments(this.dbId, this.taskId, [
      Query.equal("board_id", [board_db_id]),
    ]);
    return tasks.documents;
  }
}

const api = new API();
export default api;
