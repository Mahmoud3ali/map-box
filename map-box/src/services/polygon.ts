import { RawPolygon } from "./../models/polygon";
import { sealed } from "../utils";
import http from "./http";

@sealed
class PolygonService {
  private static instance: PolygonService;
  private constructor() {}
  public static getInstance(): PolygonService {
    if (!PolygonService.instance) {
      PolygonService.instance = new PolygonService();
    }
    return PolygonService.instance;
  }

  async list(): Promise<RawPolygon[]> {
    try {
      const { data } = await http.get<{ data: RawPolygon[] }>("/polygon");
      return data.data;
    } catch (error) {
      if (http.isHttpError(error) && error.response) {
        switch (error.response.status) {
          default:
            throw error;
        }
      }
      http.defaultHandleForNonHttpError(error);
      throw new Error("Something went wrong");
    }
  }
}

const polygonService = PolygonService.getInstance();
export { polygonService };
