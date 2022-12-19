import { User } from "../models/user";
import { sealed } from "../utils";
import http from "./http";

@sealed
class UserService {
  private static instance: UserService;
  private constructor() {}
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async list(): Promise<User[]> {
    try {
      const { data } = await http.get<{ users: User[] }>("/users");
      return data.users;
    } catch (error) {
      http.defaultHandleForNonHttpError(error);
      throw new Error("Something went wrong");
    }
  }
}

const userService = UserService.getInstance();
export { userService };
