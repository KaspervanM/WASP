export function evaluate(
  code: string,
  begin: number,
  end: number
): Promise<string | number | Array<string | number>> {
  return new Promise<string | number | Array<string | number>>(function (
    resolve,
    reject
  ) {
    try {
      const res: string | number = eval(
        code + "\n\nmain(" + begin + ", " + end + ");"
      );
      resolve(res);
    } catch (err) {
      reject(
        "An error occurred while evaluating the code: (" +
          err.name.toString() +
          "): " +
          err.message.toString()
      );
    }
  });
}
