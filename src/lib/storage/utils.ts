/**
 * Compute the cosine similarity between two numeric vectors.
 * @param a First vector
 * @param b Second vector
 * @returns Cosine similarity in [-1, 1]
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  const minLength = Math.min(a.length, b.length);
  let dot = 0;
  for (let i = 0; i < minLength; i++) {
    dot += a[i] * b[i];
  }
  let magA = 0;
  for (const val of a) {
    magA += val * val;
  }
  let magB = 0;
  for (const val of b) {
    magB += val * val;
  }
  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}