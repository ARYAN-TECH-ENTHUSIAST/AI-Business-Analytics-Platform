import api from "./api";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "@/types/auth";

export const register = async (
  data: RegisterRequest
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

export const login = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const params = new URLSearchParams();

  params.append("username", data.email);
  params.append("password", data.password);

  const response = await api.post<LoginResponse>(
    "/auth/login",
    params,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  localStorage.setItem(
    "token",
    response.data.access_token
  );

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return !!localStorage.getItem("token");
};