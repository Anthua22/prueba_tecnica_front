export const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora

/** true si el dato se pidió hace menos de 1 hora */
export function isFresh(fetchedAt: number | null, now = Date.now()): boolean {
  return fetchedAt !== null && now - fetchedAt < CACHE_TTL_MS;
}
