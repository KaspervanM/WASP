/*
 * Euler computation in Javascript using the BigInt type
 * No post-processing needed, just add a dot at index 1 (eg. 271 => 2.71)
 * Terms vs. correct digits (including starting 2)
 * 1	0
 * 2	1
 * 5	3
 * 10	8
 * 20	20
 * 50	67
 * 100	161
 * 200	378
 * 500	1137
 * 1000	2571
 * 2000	5739
 * 5000	16331
 * 10000	35664
 */
"use strict";
const DP = 10n ** BigInt(1e5) + 64n; // Decimal precision

function fact(n) {
  return n > 1 ? n * fact(n - 1n) : 1n;
}

function main(start, end) {
  const bigEnd = BigInt(end);
  let sum = 0n;
  let k = BigInt(start);

  for (;;) {
    sum += DP / fact(k);
    k += 1n;
    if (k > bigEnd) break;
  }
  return sum.toString();
}
