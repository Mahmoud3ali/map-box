import faker from "faker";
import { db } from "../tests";
import { Polygon } from "./polygon";
beforeAll(async () => {
  await db.connect();
});

describe("save", () => {
  it("should create polygon with title and area", async () => {
    const title = faker.internet.userName();
    const area = [
      Array(2)
        .fill(0)
        .forEach(() => [faker.datatype.number(), faker.datatype.number()]),
    ];

    const polygon = new Polygon({ title, area });
    await polygon.save();

    const fetched = await Polygon.findById(polygon._id);

    expect(fetched).not.toBeNull();

    expect(fetched!.title).toBe(title);
    expect(fetched!.area).not.toBe(area);
  });

  it("should not save polygon without title", async () => {
    const area = [
      Array(2)
        .fill(0)
        .forEach(() => [faker.datatype.number(), faker.datatype.number()]),
    ];
    const polygon = new Polygon({ area });
    await expect(polygon.save()).rejects.toThrowError(/title/);
  });

  it("should not save polygon with non number area data", async () => {
    const title = faker.internet.userName();

    const polygon = new Polygon({ title, area: [[1, "xxxx"]] });
    await expect(polygon.save()).rejects.toThrowError(/area/);
  });
});
