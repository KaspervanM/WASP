/*
 * Liouville's constant computation in Javascript using the BigInt type
 * No post-processing needed, just "0." in front of the results (eg. 110001 => 0.110001)
 * Start with k = 1
 */
"use strict";
const DP = 10n ** BigInt(1e5) + 64n; // Decimal precision

function fact(n) {
  if (n === 0n || n === 1n) return 1n;
  for (let i = n - 1n; i >= 1n; i--) {
    n *= i;
  }
  return n;
}

function main(start, end) {
  const bigEnd = BigInt(end);
  let sum = 0n;
  let k = BigInt(start);

  for (;;) {
    sum += DP / 10n ** fact(k);
    k += 1n;
    if (k > bigEnd) break;
  }
  return sum.toString();
}
