"use client";
import { useEffect, useState } from "react";
import { getProfile, updateProfile, UserProfile } from "@/lib/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
      setUsername(profile.username);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setMessage("Failed to load profile");
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const payload: Partial<{ username: string; password?: string }> = { username };
      if (password) payload.password = password;

      const updated = await updateProfile(user._id, payload);
      setUser(updated);
      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed text-gray-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password (change only if needed)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition text-lg"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {message && <p className="text-green-600 mt-3 text-center font-medium">{message}</p>}
        </div>
      </div>
    </div>
  );
}
