export const humanize = (str: string): string => {
  const zero = 0;
  const one = 1;
  const EMPTYSTRING = "";

  if (!str) {
    return EMPTYSTRING;
  }

  let frags = [str];
  if (str.includes("_")) {
    frags = str.split("_");
  } else if (str.includes("-")) {
    frags = str.split("-");
  }

  for (let i = zero; i < frags.length; i++) {
    frags[i] = frags[i].charAt(zero).toUpperCase() + frags[i].slice(one);
  }
  return frags.join(" ");
};
