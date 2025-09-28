"use client";
import { Transaction } from "@/lib/transaction";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (tx: Transaction) => void;
}

export default function TransactionList({ transactions, onDelete, onEdit }: Props) {
  if (transactions.length === 0) return <p className="text-gray-500 mt-4 text-center">Henüz işlem yok.</p>;

  return (
    <ul className="mt-6 space-y-2 w-full">
      {transactions.map((tx) => (
        <li key={tx._id} className="flex flex-col md:flex-row justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:gap-4 w-full md:w-auto items-start md:items-center">
            <span className="font-medium">{tx.note || "Not yok"}</span>
            <span className={tx.type === "income" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              {tx.type === "income" ? "+" : "-"} {tx.amount} ₺
            </span>
            {tx.category && (
              <span className="ml-2 px-2 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: tx.category.color, color: "#fff" }}>
                {tx.category.name}
              </span>
            )}
            <span className="ml-2 text-sm text-gray-500">
              {tx.date ? new Date(tx.date).toLocaleDateString() : "-"}
            </span>
          </div>
          <div className="flex gap-3 mt-2 md:mt-0">
            <button onClick={() => onEdit(tx)} className="text-blue-600 hover:underline">Edit</button>
            <button onClick={() => onDelete(tx._id!)} className="text-red-600 hover:underline">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
