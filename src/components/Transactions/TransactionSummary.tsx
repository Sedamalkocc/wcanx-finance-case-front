"use client";
import { useEffect, useState } from "react";
import { getSummary, SummaryItem } from "@/lib/transaction";

export default function TransactionSummary() {
  const [summary, setSummary] = useState<SummaryItem[]>([]);

  useEffect(() => {
    getSummary("monthly").then(setSummary).catch(console.error);
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6 w-full">
      <h2 className="text-xl font-semibold mb-3">Monthly Summary</h2>
      <ul className="space-y-2">
        {summary.map((item, idx) => (
          <li key={idx} className="flex justify-between border p-2 rounded">
            <span>{item.categoryName || "No Category"}</span>
            <span className={item.type === "income" ? "text-green-600" : "text-red-600"}>{item.totalAmount} ₺</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
