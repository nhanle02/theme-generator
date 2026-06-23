"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { GridColDef } from "@mui/x-data-grid";

import Chip from "@mui/material/Chip";

import CommonDataGrid from "@/components/ui/DataGrid";
import Button from "@/components/ui/Button";

import { Script, getScripts } from "@/lib/scripts.api";

export default function HistoryScriptPage() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getScripts();
        setScripts(data);
      } catch (error) {
        console.error("Fetch scripts failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },

    // PROMPT (flexible format)
    {
      field: "prompt",
      headerName: "Prompt",
      flex: 1,
      valueGetter: (_, row) =>
        row?.input_json?.prompt ||
        row?.input_json?.description ||
        "-",
    },

    // PLATFORM (new structure support)
    {
      field: "platform",
      headerName: "Platform",
      width: 120,
      valueGetter: (_, row) =>
        row?.input_json?.metadata?.platform ||
        row?.input_json?.platform ||
        "-",
    },

    // HOOK (NEW - rất quan trọng cho script AI)
    {
      field: "hook",
      headerName: "Hook",
      flex: 1,
      valueGetter: (_, row) =>
        row?.output_json?.result?.hook ||
        row?.output_json?.hook ||
        "-",
    },

    // STATUS
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value || "unknown"}
          color={
            params.value === "completed"
              ? "success"
              : params.value === "failed"
              ? "error"
              : "warning"
          }
        />
      ),
    },

    // CREATED AT (FIXED)
    {
      field: "created_at",
      headerName: "Created",
      width: 180,

      valueGetter: (_, row) => {
        if (!row?.created_at) return "-";
        return new Date(row.created_at).toLocaleString();
      },
    },

    // ACTIONS
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,

      renderCell: (params) => {
        const script = params.row;

        if (script.status === "failed") {
          return (
            <Chip size="small" label="No Result" color="error" />
          );
        }

        if (script.status === "processing") {
          return (
            <Chip size="small" label="Processing" color="warning" />
          );
        }

        return (
          <Button
            variant="primary"
            onClick={() =>
              router.push(`/history_script/${script.id}`)
            }
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold">
            Script History
          </h2>

          <Button
            variant="primary"
            onClick={() => router.push("/generate-script")}
          >
            Create Script
          </Button>
        </div>

        <CommonDataGrid
          rows={scripts}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
}