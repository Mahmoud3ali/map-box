import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DocumentDefinition } from "mongoose";
import { ServerError, ValidationError } from "../errors";
import { User, IUser } from "../models/user";

class UserService {
  async login(user: DocumentDefinition<IUser>): Promise<string> {
    try {
      const foundUser = await User.findOne({
        email: user.email,
      }).select("+password");

      if (!foundUser)
        throw new ValidationError("Email/Password is not correct");

      const isMatch = bcrypt.compareSync(user.password, foundUser.password);

      if (!isMatch) throw new ValidationError("Email/Password is not correct");

      if (process.env.JWT_SECRET === undefined)
        throw new ServerError("Failed to generate token");

      const token = jwt.sign(
        { id: foundUser._id, email: foundUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );
      return token;
    } catch (error) {
      throw error;
    }
  }

  async list(): Promise<IUser[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
