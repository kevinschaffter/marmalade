export const useMockExpensiveRender = (ms: number) => {
  const start = performance.now();
  while (performance.now() - start < ms) {}
};
