import api from "./api";

export interface LoginResponse {
  access_token: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", { email, password });
  return res.data;
};

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
}

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", {
    username,
    email,
    password,
  });
  return res.data;
};
