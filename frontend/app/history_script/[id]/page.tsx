"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";

import { Script, getScript } from "@/lib/scripts.api";

export default function ScriptDetailPage() {
  const { id } = useParams();

  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) return;

        const {data} = await getScript(String(id));
        setScript(data);
      } catch (error) {
        console.error("Failed to load script:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <CircularProgress />
      </div>
    );
  }

  if (!script) {
    return <div className="p-10">Script not found</div>;
  }

  const statusColor =
    script.status === "completed"
      ? "success"
      : script.status === "failed"
      ? "error"
      : "warning";

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          {/* HEADER */}
          <div className="flex justify-between mb-6">
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Script Detail
            </Typography>

            <Chip label={script.status} color={statusColor} />
          </div>

          <Divider />

          {/* PROMPT */}
          <div className="mt-6">
            <Typography sx={{ fontWeight: "bold" }}>
              Prompt
            </Typography>

            <Typography className="mt-2">
              {script.input_json?.prompt || "No prompt"}
            </Typography>
          </div>

          {/* SUCCESS */}
          {script.status === "completed" && (
            <>
              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                🎯 Hook
              </Typography>

              <Typography sx={{ mb: 4 }}>
                {script.output_json?.result?.hook || "-"}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                📝 Body
              </Typography>

              <Typography    sx={{ whiteSpace: "pre-line", mb: 4 }}>
                {script.output_json?.result?.body || "-"}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                🚀 CTA
              </Typography>

              <Typography>
                {script.output_json?.result?.cta || "-"}
              </Typography>
            </>
          )}

          {/* ERROR */}
          {script.status === "failed" && (
            <div className="mt-6">
              <Typography color="error">
                {script.output_json?.error || "Unknown error"}
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}