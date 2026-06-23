"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { GridColDef } from "@mui/x-data-grid";

import Chip from "@mui/material/Chip";
import VisibilityIcon from "@mui/icons-material/Visibility";

import CommonDataGrid from "@/components/ui/DataGrid";
import Button from "@/components/ui/Button";

import {
  Script,
  getScripts,
} from "@/lib/scripts.api";

export default function HistoryScriptPage() {
  const [scripts, setScripts] =
    useState<Script[]>([]);

  const [loading, setLoading] =
    useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data =
          await getScripts();

        setScripts(data);

      } catch (error) {
        console.error(
          "Fetch scripts failed:",
          error
        );

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

    {
      field: "prompt",
      headerName: "Prompt",
      flex: 1,

      valueGetter: (_, row) =>
        row?.input_json?.prompt || "-",
    },

    {
      field: "platform",
      headerName: "Platform",
      width: 120,

      valueGetter: (_, row) =>
        row?.input_json?.platform || "-",
    },

    {
      field: "status",
      headerName: "Status",
      width: 130,

      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value}
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

    {
      field: "created_at",
      headerName: "Created",
      width: 180,

      valueFormatter: (value) =>
        new Date(value).toLocaleString(),
    },

    {
  field:"actions",
  headerName:"Actions",
  width:140,

  sortable:false,

  renderCell:(params)=>{

    const script =
      params.row;

      if(
        script.status==="failed"
      ){
        return (
          <Chip
            size="small"
            label="No Result"
            color="error"
          />
        );
      }

      if(
        script.status==="processing"
      ){
        return (
          <Chip
            size="small"
            label="Processing"
            color="warning"
          />
        );
      }

      return (

        <Button
          variant="primary"
          onClick={()=>
            router.push(
              `/history_script/${script.id}`
            )
          }
        >
          View
        </Button>

      );
    }
  }
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
            onClick={() =>
              router.push(
                "/generate-script"
              )
            }
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