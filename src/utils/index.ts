export function defaultdict<T>(fn: () => T): Record<string, T> {
  return new Proxy({} as Record<string, T>, {
    get(target, key: string) {
      if (key in target) {
        return target[key];
      } else {
        return (target[key] = fn());
      }
    },
  });
}
