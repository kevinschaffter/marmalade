// TODO: Wire up the onClick handlers on both arrow buttons to call onPageChange.
//   Left arrow:  onPageChange(pageIndex - 1)
//   Right arrow: onPageChange(pageIndex + 1)
//
// Also update UserTable.tsx to slice the data array based on pageIndex so that
// only the current page's rows are rendered.

export type PaginationProps = {
  pageIndex: number;
  pageCount: number;
  onPageChange: (pageIndex: number) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
};

export default function Pagination({
  pageIndex,
  pageCount,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        disabled={pageIndex === 0}
        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        // TODO: add onClick
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <span className="text-sm text-gray-600 tabular-nums px-2">
        {pageIndex + 1} / {pageCount}
      </span>

      <button
        disabled={pageIndex >= pageCount - 1}
        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        // TODO: add onClick
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
