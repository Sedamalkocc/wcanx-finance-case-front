"use client";
import { useEffect, useState } from "react";
import { filterTransactions, Transaction } from "@/lib/transaction";
import { Category, getCategories } from "@/lib/categories";

interface Props {
  onFilter: (txs: Transaction[]) => void;
}

export default function TransactionFilter({ onFilter }: Props) {
  const [type, setType] = useState<"income" | "expense" | "">("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleFilter = async () => {
    const data = await filterTransactions({
      type: type || undefined,
      categoryName: categoryName || undefined,
      date: date || undefined,
    });
    onFilter(data);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md mt-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Filter Transactions</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="border rounded-lg p-2 w-full md:w-40 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border rounded-lg p-2 w-full md:w-40 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Categories</option>
          {categories.map(c => (<option key={c._id} value={c.name}>{c.name}</option>))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 w-full md:w-40"
        />

        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
