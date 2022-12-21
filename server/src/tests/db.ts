import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

class DB {
  private static instance: DB;
  private db?: MongoMemoryServer;

  static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public async connect() {
    this.db = await MongoMemoryServer.create();
    mongoose.set("strictQuery", true);
    await mongoose.connect(this.db.getUri());

    mongoose.connection.on("connected", () => {
      console.info("Mocked Mongo: connected ✅");
    });

    mongoose.connection.on("disconnected", () => {
      console.error("Mocked Mongo: disconnected ❌");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Mocked Mongo:  ${String(err)} ❌`);
    });
  }

  public async disconnect() {
    if (this.db) {
      await mongoose.disconnect();
      await this.db.stop();
    }
  }

  public clear() {
    return mongoose.connection.db.dropDatabase();
  }

  public getDB() {
    return this.db;
  }
}

export default DB.getInstance();
