export function hash(text: string, totalBuckets: number): number {
  let hashC: number = 5381;
  const primeNumber: number = 89;

  for (let i = 0; i < text.length; i++) {
    hashC = (hashC * primeNumber) ^ text.charCodeAt(i);
  }

  return ((hashC % totalBuckets) + totalBuckets) % totalBuckets;
}
