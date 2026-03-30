"use client";

import { UserTable } from "@/components/UserTable";
import type { UsersResponse, UserDetailsResponse } from "@/types/api";
import { RefreshCounter } from "@/components/RefreshCounter";

export type TableRow = {
  id: string;
  name: string;
  role: string;
  createdAt: string;
};

//  Fetch these two endpoints and massage the data into what the table expects.
//  The table should only include users that are is "api/users"
//  "/api/users",
//  "/api/user-details",

export default function Page() {

  const handleRowClick = (id: string) => {
    console.log("Selected user:", id);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-none">
                User Dashboard
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage your team members
              </p>
            </div>
          </div>
          <RefreshCounter />
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <UserTable data={[]} onRowClick={handleRowClick} />
      </div>
    </main>
  );
}
