import { useEffect, useState } from "react";

type RefreshCounterProps = {
  intervalMs?: number;
};

export const RefreshCounter = ({ intervalMs = 5000 }: RefreshCounterProps) => {
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setRefreshCount(refreshCount + 1);
    }, intervalMs);
  }, [intervalMs, refreshCount]);

  return (
    <span className="text-xs text-gray-400 tabular-nums">
      auto-refresh #{refreshCount}
    </span>
  );
};
