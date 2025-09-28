"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Reports() {
  const [data, setData] = useState<{ categoryName: string; total: number }[]>([]);

  useEffect(() => {
    api.get("/reports/by-category?type=expense")
      .then(res => setData(res.data))
      .catch(() => console.error("Report verisi alınamadı"));
  }, []);

  const COLORS = ["#6C9BCF", "#F6D6C3", "#A8E6CF", "#FFD3B6", "#FFAAA5"];

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">📈 Harcama Dağılımı</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="total"
          nameKey="categoryName"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
