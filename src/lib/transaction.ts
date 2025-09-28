import api from "./api";
import { Category } from "./categories";

export interface Transaction {
  _id?: string;
  type: "income" | "expense";
  amount: number;
  categoryId: string;
  note?: string;
  date?: Date;
  category?: Category; 
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get<Transaction[]>("/transactions");
  return res.data;
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  const res = await api.get<Transaction>(`/transactions/${id}`);
  return res.data;
};

export const createTransaction = async (data: Transaction): Promise<Transaction> => {
  const res = await api.post<Transaction>("/transactions", data);
  return res.data;
};

export const updateTransaction = async (
  id: string,
  data: Partial<Transaction>
): Promise<Transaction> => {
  const res = await api.put<Transaction>(`/transactions/${id}`, data);
  return res.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};

export const filterTransactions = async (params: {
  date?: string;
  type?: "income" | "expense";
  categoryName?: string;
}): Promise<Transaction[]> => {
  const res = await api.get<Transaction[]>("/transactions/filter", { params });
  return res.data;
};

export const getTotals = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<{ income: number; expense: number }> => {
  const res = await api.get<{ income: number; expense: number }>("/transactions/totals", {
    params,
  });
  return res.data;
};

export interface SummaryItem {
  categoryName: string;
  type: "income" | "expense";
  color?: string;
  totalAmount: number;
}

export const getSummary = async (period: "weekly" | "monthly" = "monthly"): Promise<SummaryItem[]> => {
  const res = await api.get<SummaryItem[]>("/transactions/summary", {
    params: { period: String(period) },
  });
  return res.data;
};


