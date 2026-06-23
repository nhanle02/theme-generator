"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Script = {
  id: number;
  output_url: string;
  created_at: string;
};

export default function ScriptDetailPage() {
  const { id } = useParams();
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScript = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/scripts/${id}`,
          {
            credentials: "include",
          }
        );

        const resJson = await res.json();

        setScript(resJson.data.data);
      } catch (err) {
        console.error("Failed to fetch script:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchScript();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!script) return <div className="p-4">Script not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="border p-4 rounded bg-gray-50 whitespace-pre-wrap">
        {script.output_url || "Processing..."}
      </div>
    </div>
  );
}