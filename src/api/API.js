import { Client, Databases, ID } from "appwrite";
import config from "./config";

class API {
  constructor() {
    const client = new Client()
      .setEndpoint(config.endpoint)
      .setProject(config.proj);

    this.db = new Databases(client);
    this.dbId = config.db;

    this.boardsId = config.boards;
  }

  async getAllBoards(userId) {
    try {
      const res = await this.db.listDocuments(this.dbId, this.boardsId);
      console.log(res);
    } catch (error) {
      console.error("Error fetching documents:", error);
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
}

const api = new API();
export default api;
