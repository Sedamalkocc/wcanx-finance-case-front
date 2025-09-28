"use client";
import { useEffect, useState } from "react";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
  Transaction,
} from "@/lib/transaction";

// Transaction Form
function TransactionForm({ onAdd }: { onAdd: (t: Transaction) => void }) {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"income" | "expense">("income");
  const [note, setNote] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTx = await createTransaction({
      amount,
      type,
      categoryId: "default",
      note,
      date: new Date(),
    });
    onAdd(newTx);
    setAmount(0);
    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 bg-gray-50 p-3 rounded-xl shadow-sm"
    >
      <input
        type="text"
        placeholder="Not"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="flex-1 border rounded-lg p-2"
      />
      <input
        type="number"
        placeholder="Tutar"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full sm:w-32 border rounded-lg p-2"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
        className="border rounded-lg p-2"
      >
        <option value="income">Gelir</option>
        <option value="expense">Gider</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-2 sm:mt-0"
      >
        Ekle
      </button>
    </form>
  );
}

// Transaction List
function TransactionList({
  transactions,
  onDelete,
  onEdit,
}: {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (tx: Transaction) => void;
}) {
  if (transactions.length === 0) {
    return <p className="text-gray-500 mt-3">Henüz işlem yok.</p>;
  }

  return (
    <ul className="mt-3 space-y-2">
      {transactions.map((tx) => (
        <li
          key={tx._id}
          className="flex flex-col sm:flex-row justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col sm:flex-row sm:gap-4 w-full sm:w-auto">
            <span>{tx.note || "Not yok"}</span>
            <span
              className={
                tx.type === "income"
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {tx.type === "income" ? "+" : "-"} {tx.amount} ₺
            </span>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => onEdit(tx)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => tx._id && onDelete(tx._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Edit Modal
function EditTransactionModal({
  tx,
  onClose,
  onUpdate,
}: {
  tx: Transaction | null;
  onClose: () => void;
  onUpdate: (updated: Transaction) => void;
}) {
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (tx) {
      setAmount(tx.amount);
      setNote(tx.note || "");
    }
  }, [tx]);

  if (!tx) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await updateTransaction(tx._id!, { amount, note });
    onUpdate(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-3 w-80"
      >
        <h3 className="text-lg font-semibold">Edit Transaction</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
          className="border p-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded border"
          >
            Cancel
          </button>
          <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

// Totals
function TransactionTotals({ transactions }: { transactions: Transaction[] }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <div className="bg-green-50 p-4 rounded-xl text-center shadow-sm">
        <h3 className="text-green-700 font-semibold">Gelir</h3>
        <p className="text-lg font-bold text-green-600">{income} ₺</p>
      </div>
      <div className="bg-red-50 p-4 rounded-xl text-center shadow-sm">
        <h3 className="text-red-700 font-semibold">Gider</h3>
        <p className="text-lg font-bold text-red-600">{expense} ₺</p>
      </div>
      <div className="bg-indigo-50 p-4 rounded-xl text-center shadow-sm">
        <h3 className="text-indigo-700 font-semibold">Bakiye</h3>
        <p className="text-lg font-bold text-indigo-600">{balance} ₺</p>
      </div>
    </div>
  );
}

// Main Page
export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch(() => console.error("Transactions yüklenemedi"));
  }, []);

  const handleAdd = (tx: Transaction) =>
    setTransactions((prev) => [...prev, tx]);

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  const handleUpdate = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">💵 Transactions</h1>

      <TransactionForm onAdd={handleAdd} />

      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={setEditingTx}
      />

      <TransactionTotals transactions={transactions} />

      {editingTx && (
        <EditTransactionModal
          tx={editingTx}
          onClose={() => setEditingTx(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
