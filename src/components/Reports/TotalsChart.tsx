"use client";

import { useEffect, useState } from "react";
import { getTotals } from "@/lib/transaction";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TotalsChart() {
  const [totals, setTotals] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    async function fetchTotals() {
      const res = await getTotals();
      console.log('API Response:', res);
      setTotals(res);
    }
    fetchTotals();
  }, []);

  const balance = totals.income - totals.expense;

  const chartData = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        label: "Amount",
        data: [totals.income, totals.expense, balance],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"], 
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto my-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Gelir - Gider Özeti</h2>
      <Bar data={chartData} />
      <p className="mt-2 text-center font-semibold">
        Toplam Bakiye: {balance} TL
      </p>
    </div>
  );
}
