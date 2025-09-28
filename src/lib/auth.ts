import api from "./api";

export interface UserProfile {
  _id: string;
  username: string;
  email: string;
}

// -------- LOGIN & REGISTER --------
export interface LoginResponse {
  access_token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
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
  const res = await api.post<RegisterResponse>("/auth/register", { username, email, password });
  return res.data;
};

export const getProfile = async (): Promise<UserProfile> => {
  const res = await api.get<UserProfile>("/users/me");
  return res.data;
};

export const updateProfile = async (
  userId: string,
  payload: Partial<{ username: string; password?: string }>
): Promise<UserProfile> => {
  const res = await api.put<UserProfile>(`/users/${userId}`, payload);
  return res.data;
};
