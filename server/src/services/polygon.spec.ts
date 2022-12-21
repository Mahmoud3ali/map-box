import faker from "faker";
import { db } from "../tests";
import polygon from "./polygon";
beforeAll(async () => {
  await db.connect();
});

describe("polygons service", () => {
  it("should return list of polygons", async () => {
    const polygons = await polygon.list();
    expect(polygons).not.toBeNull();
    expect(polygons).toEqual([]);
  });
});
