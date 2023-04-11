import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdEncoderService {
  private alphabet = '23456789CFGHJMPQRVWXcfghjmpqrvwx';
  constructor() {}

  encode(id: bigint) {
    let reverseEncoded = '';
    const base = BigInt(this.alphabet.length);
    do {
      reverseEncoded += this.alphabet[Number(id % base)];
      id /= base;
    } while (id);
    return reverseEncoded.split('').reverse().join('');
  }

  decode(id: string) {
    const base = BigInt(this.alphabet.length);

    if (/^[23456789CFGHJMPQRVWXcfghjmpqrvwx]+$/.test(id))
      return id
        .split('')
        .map((digit) => BigInt(this.alphabet.indexOf(digit)))
        .reduce((prev, cur) => prev * base + cur, 0n);
    return -1n;
  }
}
