import api from "./api";

export interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
  color?: string;
  priority?: number;
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};

export const getCategoriesByType = async (
  type: "income" | "expense"
): Promise<Category[]> => {
  const res = await api.get<Category[]>(`/categories/type/${type}`);
  return res.data;
};

export const createCategory = async (data: Partial<Category>): Promise<Category> => {
  const res = await api.post<Category>("/categories", data);
  return res.data;
};

export const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
  const res = await api.put<Category>(`/categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

export const getCategoryStats = async () => {
  const res = await api.get("/categories/stats");
  return res.data;
};
