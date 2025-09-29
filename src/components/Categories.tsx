"use client";

import { useEffect, useState } from "react";
import { getCategories, Category } from "@/lib/categories";

const priorityColors: Record<number, string> = {
  1: "#b71c1c",
  2: "#f44336",
  3: "#ff9800",
  4: "#ffc107",
  5:"#4caf50",
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Categories alınamadı", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">🏷️ Kategoriler</h2>
      <ul className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <li
            key={cat._id}
            className="px-3 py-1 rounded-lg text-sm font-medium text-white"
            style={{
              backgroundColor: cat.color || priorityColors[cat.priority ?? 1] || "#eee",
            }}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
