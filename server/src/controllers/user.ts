import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import userService from "../services/user";
import { getErrorMessage } from "../utils";

class AuthController {
  public path = "/users";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, requireAuth, this.list);
  }

  public list = async (_: Request, res: Response) => {
    try {
      const users = await userService.list();
      res.status(200).send({ users });
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  };
}

export default new AuthController();
