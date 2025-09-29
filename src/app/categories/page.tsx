"use client";

import { useEffect, useState } from "react";
import { getCategories, Category, updateCategory, createCategory, deleteCategory } from "@/lib/categories";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [priority, setPriority] = useState("1");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { 
        name, 
        type, 
        priority: parseInt(priority, 6)
      };

      if (editingId) {
        await updateCategory(editingId, payload);
        setMessage("Category updated!");
      } else {
        await createCategory(payload);
        setMessage("Category created!");
      }
      resetForm();
      fetchCategories();
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error saving category");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat._id);
    setName(cat.name || "");
    setType(cat.type || "expense");
    setPriority((cat.priority ?? 1).toString());
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await deleteCategory(id);
    fetchCategories();
  };

  const resetForm = () => {
    setName("");
    setType("expense");
    setPriority("1");
    setEditingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* Form */}
      <div className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-lg flex-1"
        />
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value as any)} 
          className="border p-2 rounded-lg"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded-lg w-20"
          placeholder="Priority"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {/* Categories list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories
          .sort((a, b) => (a.priority ?? 1) - (b.priority ?? 1))
          .map((cat) => (
            <div
              key={cat._id}
              className="p-4 rounded-lg shadow flex justify-between items-center text-white"
              style={{ backgroundColor: cat.color }} 
            >
              <div>
                <p className="font-bold">{cat.name}</p>
                <p className="text-sm capitalize">{cat.type}</p>
                <p className="text-xs opacity-80">Priority: {cat.priority ?? 1}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(cat)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(cat._id)} className="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
