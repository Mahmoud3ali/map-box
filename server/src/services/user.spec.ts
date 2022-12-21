import faker from "faker";
import { createDummyAndAuthorizeUser, createDummyUser, db } from "../tests";
import user from "./user";

beforeAll(async () => {
  await db.connect();
});

describe("login", () => {
  beforeEach(async () => {
    process.env.JWT_SECRET = "secret";
  });
  it("should return JWT token, to a valid login/password", async () => {
    const dummyUser = await createDummyUser();
    const token = await user.login({
      email: dummyUser.email,
      password: dummyUser.password,
    });
    expect(token).not.toBeNull();
  });

  it("should reject with error if login does not exist", async () => {
    expect(
      user.login({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    ).rejects.toThrowError(/Email\/Password is not correct/);
  });

  it("should reject with error if login exist but password is incorrect", async () => {
    const dummyUser = await createDummyUser();
    expect(
      user.login({
        email: dummyUser.email,
        password: faker.internet.password(),
      })
    ).rejects.toThrowError(/Email\/Password is not correct/);
  });
});

it("should return list of users", async () => {
  await createDummyUser();
  const users = await user.list();
  expect(users).not.toBeNull();
  expect(users).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String),
      }),
    ])
  );
});
