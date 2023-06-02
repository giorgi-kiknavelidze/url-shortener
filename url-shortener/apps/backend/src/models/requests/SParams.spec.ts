import { expect } from "chai";
import { validate } from "class-validator";
import { SParams } from "./SParams";

describe("SParams", () => {
  it("should validate if valid encodedShortId is provided", async () => {
    const sParams = new SParams({
      encodedShortId: "23456789CFGHJMPQRVWXcfghjmpqrvwx",
    });
    expect(await validate(sParams)).to.be.empty;
  });

  it("should not validate if encodedShortId is incorrectly encoded", async () => {
    const sParams = new SParams({
      encodedShortId: "z23456789CFGHJMPQRVWXcfghjmpqrvwx",
    });
    expect(await validate(sParams)).not.to.be.empty;
  });
});
