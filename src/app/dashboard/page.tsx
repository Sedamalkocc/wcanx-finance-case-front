"use client";

import { useEffect, useState } from "react";

export default function DashboardHome() {
  const [username, setUsername] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hoşgeldin, Kullanıcı 👋</h1>
        <p className="text-gray-600 mt-2">Bugün finans durumunu hızlıca görebilirsin.</p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded-xl shadow hover:scale-105 transform transition cursor-pointer">
            <p className="font-bold text-gray-800">Kategoriler</p>
            <p className="text-gray-500 mt-1 text-sm">Gelir ve gider kategorilerini yönet</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:scale-105 transform transition cursor-pointer">
            <p className="font-bold text-gray-800">Hareketler</p>
            <p className="text-gray-500 mt-1 text-sm">Tüm gelir-gider hareketlerini görüntüle</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:scale-105 transform transition cursor-pointer">
            <p className="font-bold text-gray-800">Raporlar</p>
            <p className="text-gray-500 mt-1 text-sm">Haftalık ve aylık özet raporları gör</p>
          </div>
        </div>
      </div>
    </div>
  );
}
