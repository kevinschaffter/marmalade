import { memo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type Row,
} from "@tanstack/react-table";
import { processRowForExport } from "./usersTable.utils";

import SearchBox from "./SearchBox";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import type { TableRow } from "../src/App";
import { useMockExpensiveRender } from "../hooks/useMockExpensiveRender";

const columnHelper = createColumnHelper<TableRow>();

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-rose-100 text-rose-700",
  editor: "bg-blue-100 text-blue-700",
  viewer: "bg-emerald-100 text-emerald-700",
  moderator: "bg-purple-100 text-purple-700",
  analyst: "bg-amber-100 text-amber-700",
};

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      const name = info.getValue();
      const start = performance.now();
      while (performance.now() - start < 0.1) {} // block 0.1ms each
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {name.charAt(0)}
          </div>
          <span className="font-medium text-gray-900">{name}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => {
      const role = info.getValue();
      const colorClass = ROLE_COLORS[role] ?? "bg-gray-100 text-gray-600";
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass}`}
        >
          {role}
        </span>
      );
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Created Date",
    cell: (info) =>
      new Date(info.getValue()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  }),
];

const MemoizedRow = memo(function Row({
  row,
  onClick,
}: {
  row: Row<TableRow>;
  onClick: (id: string) => void;
}) {
  return (
    <tr
      onClick={() => onClick(row.original.id)}
      className="border-b border-gray-100 hover:bg-indigo-50/50 cursor-pointer transition-colors duration-75"
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="px-5 py-3.5 text-sm text-gray-600">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
});

type UserTableProps = {
  data: TableRow[];
  onRowClick: (id: string) => void;
};

export const UserTable = memo(({ data, onRowClick }: UserTableProps) => {
  const PAGE_SIZE = 20;
  useMockExpensiveRender(40);

  const handleExport = () => {
    let csv = "Name,Role,Created Date\n";
    for (const row of data) {
      const p = processRowForExport(row);
      csv += `${p.name},${p.role},${p.createdAt}\n`;
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "users.csv";
    anchor.click();
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-white">
        <SearchBox value="" onChange={() => {}} />
        <SortDropdown value="newest" onChange={() => {}} />
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {table.getFilteredRowModel().rows.length.toLocaleString()} users
          </span>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Scrollable table body */}
      <div className="overflow-y-auto" style={{ maxHeight: "560px" }}>
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-white border-b border-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <MemoizedRow key={row.id} row={row} onClick={onRowClick} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Showing {data.length.toLocaleString()} records
        </p>
        <Pagination
          pageIndex={0}
          pageCount={totalPages}
          onPageChange={() => {}}
          pageSize={PAGE_SIZE}
          onPageSizeChange={() => {}}
        />
      </div>
    </div>
  );
});
