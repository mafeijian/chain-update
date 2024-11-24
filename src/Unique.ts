export function unique<T>(arr: T[]) {
  const set = new Set<T>();
  return arr.reduce((acc: T[], v: T) => {
    if (!set.has(v)) {
      set.add(v);
      acc.push(v); // keep order
    }
    return acc;
  }, []);
}
