"use client";
import { useEffect, useState } from "react";
import { createTransaction, updateTransaction, Transaction } from "@/lib/transaction";
import { Category, getCategories } from "@/lib/categories";

interface Props {
  onAdd: (tx: Transaction) => void;
  editingTx?: Transaction;
  onUpdate?: (tx: Transaction) => void;
  onCancelEdit?: () => void;
}

export default function TransactionForm({ onAdd, editingTx, onUpdate, onCancelEdit }: Props) {
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (editingTx) {
      setAmount(editingTx.amount.toString());
      setType(editingTx.type);
      setNote(editingTx.note || "");
      setDate(
        editingTx.date
          ? new Date(editingTx.date).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10)
      );
      setCategoryId(editingTx.category?._id || "");
    } else {
      resetForm();
    }
  }, [editingTx]);

  useEffect(() => {
    getCategories().then((cats) => {
      const filtered = cats.filter((c) => c.type === type);
      setCategories(filtered);
      if (filtered.length > 0 && !categoryId) setCategoryId(filtered[0]._id);
    });
  }, [type]);

  const resetForm = () => {
    setAmount("");
    setNote("");
    setDate(new Date().toISOString().slice(0, 10));
    setType("income");
    setCategoryId(categories.length > 0 ? categories[0]._id : "");
  };

  const handleCancel = () => {
    resetForm();
    if (onCancelEdit) onCancelEdit();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    const txDate = date ? new Date(date) : new Date();

    if (editingTx && onUpdate) {
      const updatedTx = await updateTransaction(editingTx._id!, {
        amount: Number(amount),
        type,
        categoryId,
        note,
        date: txDate,
      });
      onUpdate(updatedTx);
    } else {
      const newTx = await createTransaction({
        amount: Number(amount),
        type,
        categoryId,
        note,
        date: txDate,
      });
      onAdd(newTx);
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 bg-gray-50 p-4 rounded-xl shadow-md w-full">
      <input
        type="number"
        placeholder="Tutar"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full md:w-32 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="text"
        placeholder="Not"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
        className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
      >
        <option value="income">Gelir</option>
        <option value="expense">Gider</option>
      </select>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
      >
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {editingTx ? "Güncelle" : "Ekle"}
        </button>
        {editingTx && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}
