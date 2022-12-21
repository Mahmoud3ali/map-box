import faker from "faker";
import { db } from "../tests";
import { User } from "./user";
beforeAll(async () => {
  await db.connect();
});

describe("save", () => {
  it("should create user with email & encrypted password", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const user = new User({ email, password });
    await user.save();

    const fetched = await User.findById(user._id).select("+password");

    expect(fetched).not.toBeNull();

    expect(fetched!.email).toBe(email);
    expect(fetched!.password).not.toBe(password);
  });

  it("should not save user with invalid email", async () => {
    const user = new User({
      email: "xxxx",
      password: faker.internet.password(),
    });
    await expect(user.save()).rejects.toThrowError(/do not match email regex/);
  });

  it("should not save user without an email", async () => {
    const user = new User({ password: faker.internet.password() });
    await expect(user.save()).rejects.toThrowError(/email/);
  });

  it("should not save user without a password", async () => {
    const user = new User({ email: faker.internet.email() });
    await expect(user.save()).rejects.toThrowError(/password/);
  });

  it("should not save user with duplicate email", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const name = faker.name.firstName();
    const userData = { email: email, password: password, name: name };

    const user1 = new User(userData);
    await user1.save();

    const user2 = new User(userData);
    await expect(user2.save()).rejects.toThrowError();
  });
});
