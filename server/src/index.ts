import express, { Request, Response, Application } from "express";
import * as dotenv from "dotenv";
import { connectToDatabase } from "./db";
import {
  AuthController,
  UserController,
  PolygonController,
} from "./controllers";
import cors from "cors";

dotenv.config();
const app: Application = express();
const PORT = process.env.NODE_DOCKER_PORT || 8000;

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_: Request, res: Response): Promise<void> => {
  res.send("Hello Typescript with Node.js!");
});

app.use("/", AuthController.router);
app.use("/", UserController.router);
app.use("/", PolygonController.router);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
