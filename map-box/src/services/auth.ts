import { AuthResponse, UserFormData } from "../models/user";
import { sealed } from "../utils";
import http from "./http";

@sealed
class AuthService {
  private static instance: AuthService;
  private constructor() {}
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login({ email, password }: UserFormData): Promise<AuthResponse> {
    try {
      const { data } = await http.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (http.isHttpError(error) && error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error("Invalid email or password");
          default:
            throw error;
        }
      }
      http.defaultHandleForNonHttpError(error);
      throw new Error("Something went wrong");
    }
  }
}

const authService = AuthService.getInstance();
export { authService };
