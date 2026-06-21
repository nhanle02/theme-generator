"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // load user
  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        { credentials: "include" }
      );

      if (!res.ok) return;

      const data = await res.json();

      setName(data.name);
      setEmail(data.email);
      setAvatar(data.avatar_url);
    };

    fetchMe();
  }, []);

  // handle image change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);

    // preview local
    setAvatar(URL.createObjectURL(f));
  };

  // save profile
  const handleSave = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);

    if (file) {
      formData.append("file", file);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        method: "PATCH",
        credentials: "include",
        body: formData,
      }
    );

    setLoading(false);

    if (!res.ok) {
      console.error("Update failed");
      return;
    }

    const data = await res.json();

    // sync lại dữ liệu từ backend
    setName(data.name);
    setEmail(data.email);
    setAvatar(data.avatar_url);

    setFile(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {/* Avatar section */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={avatar || "/default-avatar.png"}
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Change Avatar
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              JPG, PNG up to 5MB
            </p>
          </div>
        </div>

        {/* form */}
        <div className="space-y-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Email"
            value={email}
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* save button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}