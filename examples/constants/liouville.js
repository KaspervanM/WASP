/*
 * Liouville's constant computation in Javascript using the BigInt type
 * No post-processing needed, just "0." in front of the results (eg. 110001 => 0.110001)
 * Start with k = 1
 */
"use strict";
const DP = 10n ** BigInt(1e5) + 64n; // Decimal precision
var fact = [1n, 1n];

function facts(n) {
  for (let i = 2n; i <= n; i++) {
    fact.push(fact[i - 1n] * i);
  }
}

function main(start, end) {
  const bigEnd = BigInt(end);
  facts(bigEnd);
  let sum = 0n;
  let k = BigInt(start);

  for (;;) {
    sum += DP / 10n ** fact[k];
    k += 1n;
    if (k > bigEnd) break;
  }
  return sum;
}
