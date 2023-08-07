export function checkStringExists(string: string) {
  return (
    string &&
    string
      .split('')
      .filter((char) => char === ' ')
      .join().length > 0
  );
}
