function multiplicator({
  a,
  b,
  printText,
}: {
  a: number;
  b: number;
  printText: string;
}) {
  console.log(printText, a * b);
}

multiplicator({
  a: 2,
  b: 4,
  printText: 'Multiplied numbers 2 and 4, the result is:',
});
