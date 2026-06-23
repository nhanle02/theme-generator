"use client";

import { useEffect, useState } from "react";
import CommonDataGrid from "@/components/ui/DataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { getUsers, User } from "@/lib/users.api";
import Button from "@/components/ui/Button";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

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
          sx={{ width: 40, height: 40 }}
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      sortable: false,
      renderCell: (params) => {
        const user = params.row;

        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center", height: "100%" }}>
            <Button variant="primary">View</Button>

            <Button
              variant="secondary"
              onClick={() => router.push(`/users/${user.id}/edit`)}
            >
              Edit
            </Button>

            <Button variant="danger">Delete</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="flex gap-3 mb-4">
        <Button variant="primary" onClick={() => router.push("/history_script")}>
          History
        </Button>

        <Button variant="primary" onClick={() => router.push("/profile")}>
          Profile
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Users Management</h2>

        <CommonDataGrid rows={users} columns={columns} loading={loading} />
      </div>

      <div className="mt-4">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}