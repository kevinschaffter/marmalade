import type { TableRow } from "@/src/App";

// Simulates expensive per-row processing (e.g. complex serialisation, validation).
// Runs a tight 20,000-iteration loop per row — intentionally slow.
export const processRowForExport = (row: TableRow) => {
  let result = "";
  for (let i = 0; i < 20_000; i++) {
    result = `${row.name}|${row.role}|${i}`;
  }
  void result;
  return {
    name: row.name.replace(/,/g, " "),
    role: row.role,
    createdAt: new Date(row.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };
};
