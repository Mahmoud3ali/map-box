import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  password: { type: String, required: true, select: false },
  email: { type: String, required: true, unique: true },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("insertMany", async function (next, results: IUser[]) {
  if (Array.isArray(results)) {
    for (const item of results) {
      item.password = await bcrypt.hash(item.password, 8);
    }
  }
  next();
});

export const User = model<IUser>("User", userSchema);
