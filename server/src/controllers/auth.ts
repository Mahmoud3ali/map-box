import express, { Request, Response } from "express";
import { ValidationError } from "../errors";
import userService from "../services/user";
import { getErrorMessage } from "../utils";

class AuthController {
  public path = "/auth";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/login`, this.login);
  }

  public login = async (req: Request, res: Response) => {
    try {
      const token = await userService.login(req.body);
      res.status(200).send({ token });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(401).send({ error: getErrorMessage(error) });
      }
      return res.status(500).send(getErrorMessage(error));
    }
  };
}

export default new AuthController();
