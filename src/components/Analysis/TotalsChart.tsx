"use client";

import { useEffect, useState } from "react";
import { getTotals } from "@/lib/transaction";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Totals {
  income: number;
  expense: number;
}

export default function TotalsChart() {
  const [totals, setTotals] = useState<Totals>({ income: 0, expense: 0 });

  useEffect(() => {
    async function fetchTotals() {
      try {
        const res = await getTotals();
        setTotals(res);
      } catch (error) {
        console.error("Totals fetch error:", error);
      }
    }

    fetchTotals();
  }, []);

  const balance = (totals?.income || 0) - (totals?.expense || 0);

  const chartData = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        label: "Amount",
        data: [totals.income, totals.expense, balance],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
        hoverBackgroundColor: ["#66bb6a", "#e57373", "#64b5f6"],
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Gelir-Gider Grafiği" },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto my-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Gelir - Gider Özeti</h2>
      <Bar data={chartData} options={options} />
      <p className="mt-2 text-center font-semibold">
        Toplam Bakiye: {balance} TL
      </p>
    </div>
  );
}
