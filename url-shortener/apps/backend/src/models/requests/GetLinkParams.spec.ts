import { validate } from "class-validator";
import { GetLinkParams } from "./GetLinkParams";

describe("GetLinkParams", () => {
  it("should validate if a integer string is provided", async () => {
    const getLinkParams = new GetLinkParams({ shortId: "100" });
    expect(await validate(getLinkParams)).toHaveLength(0);
  });

  it("should not validate if a negative integer is provided", async () => {
    const getLinkParams = new GetLinkParams({ shortId: "-100" });
    expect(await validate(getLinkParams)).not.toHaveLength(0);
  });

  it("should not validate if a non-integer is provided", async () => {
    const getLinkParams = new GetLinkParams({ shortId: "100.1" });
    expect(await validate(getLinkParams)).not.toHaveLength(0);
  });

  it("should not validate if a huge integer is provided", async () => {
    const getLinkParams = new GetLinkParams({ shortId: `1${"0".repeat(20)}` });
    expect(await validate(getLinkParams)).not.toHaveLength(0);
  });

  it(
    "should not validate if something other than string is provided",
    async () => {
      const getLinkParams = new GetLinkParams({ shortId: 100 });
      expect(await validate(getLinkParams)).not.toHaveLength(0);
    }
  );
});
