import { expect } from "chai";
import { validate } from "class-validator";
import { AddLinkBody } from "./AddLinkBody";

describe("AddLinkBody", () => {
  it("should validate if valid link is provided", async () => {
    const addLinkBody = new AddLinkBody({ link: "http://example.com" });
    expect(await validate(addLinkBody)).to.be.empty;
  });

  it("should not validate if link is not provided", async () => {
    const addLinkBody = new AddLinkBody({
      misspelledLink: "http://example.com",
    });
    expect(await validate(addLinkBody)).not.to.be.empty;
  });

  it("should not validate if link is not a valid url", async () => {
    const addLinkBody = new AddLinkBody({
      link: "example:\\\\.com",
    });
    expect(await validate(addLinkBody)).not.to.be.empty;
  });

  it("should not validate if link is not a string", async () => {
    const addLinkBodyNumber = new AddLinkBody({ link: 500 });
    expect(await validate(addLinkBodyNumber)).not.to.be.empty;

    const addLinkBodyBoolean = new AddLinkBody({ link: true });
    expect(await validate(addLinkBodyBoolean)).not.to.be.empty;
  });
});
