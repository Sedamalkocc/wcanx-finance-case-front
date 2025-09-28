"use client";
import { Transaction } from "@/lib/transaction";

interface Props {
  transactions: Transaction[];
}

export default function TransactionTotals({ transactions }: Props) {
  const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full">
      <div className="bg-green-50 p-5 rounded-xl text-center shadow-md">
        <h3 className="text-green-700 font-semibold">Gelir</h3>
        <p className="text-2xl font-bold text-green-600">{income} ₺</p>
      </div>
      <div className="bg-red-50 p-5 rounded-xl text-center shadow-md">
        <h3 className="text-red-700 font-semibold">Gider</h3>
        <p className="text-2xl font-bold text-red-600">{expense} ₺</p>
      </div>
      <div className="bg-indigo-50 p-5 rounded-xl text-center shadow-md">
        <h3 className="text-indigo-700 font-semibold">Bakiye</h3>
        <p className="text-2xl font-bold text-indigo-600">{balance} ₺</p>
      </div>
    </div>
  );
}
