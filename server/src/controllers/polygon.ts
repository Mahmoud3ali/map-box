import { requireAuth } from "./../middlewares/requireAuth";
import express, { Request, Response } from "express";
import polygonService from "../services/polygon";
import { getErrorMessage } from "../utils";

class PolygonController {
  public path = "/polygon";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, requireAuth, this.list);
  }

  public list = async (req: Request, res: Response) => {
    try {
      const polygons = await polygonService.list();
      res.status(200).send({ data: polygons });
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  };
}

export default new PolygonController();
