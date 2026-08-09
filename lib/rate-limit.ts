type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

type RateLimitOptions = { limit: number; windowMs: number };
type RateLimitResult = { allowed: boolean; remaining: number };

/**
 * Limite em memória, por instância — suficiente nesta escala (docs/02-ARQUITETURA.md).
 * Não é garantia distribuída: cada instância serverless da Vercel tem seu próprio contador,
 * então o limite real pode ser um pouco maior que `limit` sob múltiplas instâncias.
 */
export function checkRateLimit(key: string, { limit, windowMs }: RateLimitOptions): RateLimitResult {
  const agora = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => agora - t < windowMs);

  if (bucket.timestamps.length >= limit) {
    buckets.set(key, bucket);
    return { allowed: false, remaining: 0 };
  }

  bucket.timestamps.push(agora);
  buckets.set(key, bucket);
  return { allowed: true, remaining: limit - bucket.timestamps.length };
}
