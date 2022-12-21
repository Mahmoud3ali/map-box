import faker from "faker";
import { User } from "../models/user";
import user from "../services/user";

async function createDummyUser() {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const dbUser = new User(user);
  await dbUser.save();

  return user;
}

async function createDummyAndAuthorizeUser() {
  const dummyUser = await createDummyUser();
  const token = await user.login(dummyUser);
  return { user: dummyUser, token };
}

export { default as db } from "./db";

export { createDummyUser, createDummyAndAuthorizeUser };
