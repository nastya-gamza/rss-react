export const generatePageArray = (start: number, end: number) =>
  [...Array(end - start).keys()].map((p) => p + start);
