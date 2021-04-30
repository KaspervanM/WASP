export function evaluate(
  code: string,
  begin: number,
  end: number
): string | number {
  return eval(code + "\n\nmain(" + begin + ", " + end + ");");
}
