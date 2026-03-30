import { useEffect, useRef, useState } from "react";

type RefreshCounterProps = {
  intervalMs?: number;
};

export const RefreshCounter = ({ intervalMs = 5000 }: RefreshCounterProps) => {
  const [refreshCount, setRefreshCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRefreshCount((prev) => prev + 1);
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalMs]);

  return (
    <span className="text-xs text-gray-400 tabular-nums">
      auto-refresh #{refreshCount}
    </span>
  );
};
