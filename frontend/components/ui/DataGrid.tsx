"use client";

import { User } from "@/types/user";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  rows: User[];
  columns: GridColDef[];
  loading?: boolean;
};

export default function CommonDataGrid({ rows, columns, loading }: Props) {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
      />
    </div>
  );
}