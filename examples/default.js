function main(start, end) {
  let str = "Congratulations! WASP is working correctly. Numbers:";
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(str + " " + i.toString());
  }
  return arr;
}
