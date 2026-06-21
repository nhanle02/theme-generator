"use client";

import { useEffect, useState } from "react";
import CommonDataGrid from "@/components/ui/DataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { getUsers } from "@/lib/users.api";
import Button from "@/components/ui/Button";
import Avatar from "@mui/material/Avatar";

type User = {
  id: number;
  google_id: string;
  email: string;
  name: string;
  avatar_url: string;
  credit_balance: number;
  created_at: string;
  updated_at: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "credit_balance", headerName: "Credit", width: 120 },

    {
      field: "avatar_url",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{ width: 50, height: 50 }}
        />
      ),
    },

    // 🔥 NEW COLUMN ACTIONS
    {
        field: "actions",
        headerName: "Actions",
        width: 250,
        sortable: false,
        renderCell: (params) => {
        const user = params.row;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              gap: 8,
            }}
          >
            <Button variant="primary">View</Button>
            <Button variant="secondary">Edit</Button>
            <Button variant="danger">Delete</Button>
          </div>
        );
        },
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Users Management
        </h2>

        <CommonDataGrid
          rows={users}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
}