"use client";

import { useEffect, useState } from "react";
import { getSummary } from "@/lib/transaction";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Pie chart için gerekli elementleri register et
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function CategoryPieChart() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSummary() {
      const res = await getSummary("monthly");
      console.log('API Response:', res);
      setCategories(res);
    }
    fetchSummary();
  }, []);

  const chartData = {
    labels: categories.map((c) => c.categoryName),
    datasets: [
      {
        data: categories.map((c) => c.totalAmount),
        backgroundColor: categories.map((c) => c.color || "#ccc"),
      },
    ],
  };

  const options = {
    responsive: true, // mobil ve masaüstüne uyumlu
    maintainAspectRatio: false, // container yüksekliğine göre esnek
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
        text: 'Kategori Bazlı Harcama',
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto my-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Kategori Bazlı Harcama</h2>
      <div className="relative h-80">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
