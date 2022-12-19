export type RawUser = {
  _id: string;
  email: string;
  password: string;
};
export type UserFormData = Omit<RawUser, "_id">;
export type User = Omit<RawUser, "password">;
export type AuthResponse = { token: string };

export function isUser(
  user: unknown
): user is User & { [key: string]: unknown } {
  return (
    typeof user === "object" &&
    user !== null &&
    user !== undefined &&
    "id" in user &&
    "email" in user
  );
}
