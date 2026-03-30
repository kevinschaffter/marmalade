type SortDropdownProps = {
  value: "newest" | "oldest";
  onChange: (value: "newest" | "oldest") => void;
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 whitespace-nowrap">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as "newest" | "oldest")}
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700 cursor-pointer"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}
