import { CACHE_TTL_MS, isFresh } from './cache.util';

describe('isFresh', () => {
  it('es false si nunca se ha pedido', () => expect(isFresh(null)).toBeFalse());
  it('es true antes de 1 hora', () => expect(isFresh(1000, 1000 + CACHE_TTL_MS - 1)).toBeTrue());
  it('es false pasada 1 hora', () => expect(isFresh(1000, 1000 + CACHE_TTL_MS)).toBeFalse());
});
