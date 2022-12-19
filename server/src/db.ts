import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const mongoUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

export const connectToDatabase = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoUri);
    console.info("Connected to database ✅");
  } catch (err) {
    console.error("Error connecting to database 🔥💥", err);
  }
};
