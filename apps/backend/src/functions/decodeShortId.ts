export const decodeShortId = (id: string) => {
  const alphabet = "23456789CFGHJMPQRVWXcfghjmpqrvwx";
  const base = BigInt(alphabet.length);

  if (/^[23456789CFGHJMPQRVWXcfghjmpqrvwx]+$/.test(id))
    return id
      .split("")
      .map((digit) => BigInt(alphabet.indexOf(digit)))
      .reduce((prev, cur) => prev * base + cur, BigInt(0));
  return BigInt(-1);
};
