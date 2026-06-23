"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Script = {
  id: number;
  output_url: string;
  created_at: string;
};

export default function HistoryScriptPage() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/scripts`,
          {
            credentials: "include",
          }
        );

        const {data} = await res.json();
        console.log(data);
        setScripts(data);
      } catch (err) {
        console.error("Failed to fetch scripts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScripts();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Script History</h1>

      {scripts.length === 0 ? (
        <p>No scripts found.</p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Script</th>
              <th className="p-3 border">Created</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {scripts.map((script) => (
              <tr key={script.id} className="border-t">
                <td className="p-3 border">{script.id}</td>

                <td className="p-3 border max-w-md">
                  <div className="line-clamp-2 text-sm text-gray-700">
                    {script.output_json || "Processing..."}
                  </div>
                </td>

                <td className="p-3 border text-sm text-gray-500">
                  {new Date(script.created_at).toLocaleString()}
                </td>

                <td className="p-3 border">
                  <button
                    onClick={() => router.push(`/history_script/${script.id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}