"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/transaction";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const res = await getTransactions();
      setTransactions(res);
    }
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">İşlem Listesi</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100 text-left">Tarih</th>
              <th className="border p-2 bg-gray-100 text-left">Kategori</th>
              <th className="border p-2 bg-gray-100 text-left">Tutar</th>
              <th className="border p-2 bg-gray-100 text-left">Tür</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id} className="hover:bg-gray-50">
                <td className="border p-2">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="border p-2">{tx.categoryName || "-"}</td>
                <td
  className={`border p-2 font-semibold ${
    tx.type === "expense" ? "text-red-600" : "text-green-600"
  }`}
>
  {tx.amount}
</td>
                <td className="border p-2">{tx.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
