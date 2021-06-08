const DP = 10n ** BigInt(1e5) + 64n; // Decimal precision

function floor_log2(a) {
  var k_max, a1, k, i;
  k_max = 0n;
  while (a >> (2n ** k_max) != 0n) {
    k_max++;
  }
  k = 0n;
  a1 = a;
  for (i = k_max - 1n; i >= 0n; i--) {
    a1 = a >> (2n ** i);
    if (a1 != 0n) {
      a = a1;
      k |= 1n << i;
    }
  }
  return k;
}

function ceil_log2(a) {
  return floor_log2(a - 1n) + 1n;
}

function int_sqrt(a) {
  var l, u, s;
  if (a == 0n) return a;
  l = ceil_log2(a);
  u = 1n << ((l + 1n) / 2n); // Overestimation of sqrt(a)
  //Babylonian method
  for (;;) {
    s = u;
    u = (a / s + s) / 2n;
    if (u >= s) break; // We reach peak precision when the new value exceeds or equals the last overestimation
  }
  return s;
}
const DENOM = 426880n * int_sqrt(10005n * DP ** 2n);
const sum = 0n; //Insert WASP results and the char "n" here...
var pi_val = (DENOM * DP) / sum;
var pi_str = pi_val.toString()[0] + "." + pi_val.toString().slice(1, 1e5 + 1);
console.log(pi_str);
