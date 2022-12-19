import { IPolygon, Polygon } from "./../models/polygon";
import bcrypt from "bcrypt";

class PolygonService {
  async list(): Promise<IPolygon[]> {
    try {
      const polygons = await Polygon.find();
      return polygons;
    } catch (error) {
      throw error;
    }
  }
}

export default new PolygonService();
