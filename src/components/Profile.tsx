"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface User {
  id: string;
  username: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => console.error("Profil alınamadı"));
  }, []);

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">👤 Profil</h2>
      {user ? (
        <div className="space-y-1 text-gray-700">
          <p><span className="font-medium">Kullanıcı:</span> {user.username}</p>
          <p><span className="font-medium">E-posta:</span> {user.email}</p>
        </div>
      ) : (
        <p className="text-gray-500">Yükleniyor...</p>
      )}
    </div>
  );
}
