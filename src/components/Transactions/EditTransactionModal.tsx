"use client";
import { useEffect, useState } from "react";
import { Transaction, updateTransaction } from "@/lib/transaction";
import { Category, getCategories } from "@/lib/categories";

export default function EditTransactionModal({ tx, onClose, onUpdate }: { tx: Transaction | null, onClose: () => void, onUpdate: (updated: Transaction) => void }) {
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!tx) return;
    setAmount(tx.amount);
    setNote(tx.note || "");
    setCategoryId(tx.categoryId);

    getCategories().then((cats) => {
      const filtered = cats.filter((c) => c.type === tx.type);
      setCategories(filtered);
    });
  }, [tx]);

  if (!tx) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await updateTransaction(tx._id!, { amount, note, categoryId });
    onUpdate(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">Edit Transaction</h3>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Tutar" className="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-400" />
        <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Not" className="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-400" />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400">
          {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
        </select>
        <div className="flex justify-end gap-3 mt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border hover:bg-gray-100">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Save</button>
        </div>
      </form>
    </div>
  );
}
