import express from "express";
import supertest from "supertest";
import { getLink } from "./getLink";
import { LinksService } from "../services";

describe("GET /getLink", () => {
  afterEach(() => jest.restoreAllMocks());

  it("should respond with correct shortId", async () => {
    const linksService = new LinksService();
    jest.spyOn(linksService, "getLink").mockClear().mockReturnValue(Promise.resolve("example.com"));
    const app = express();
    app.use(getLink(linksService));
    const res = await supertest(app).get("/getLink/100");
    expect(res.statusCode).toBe(200);
    expect(res.body.link).toBe("example.com");
  });

  it(
    "should respond with PARAMS_VALIDATION_FAIL error if invalid input is provided",
    async () => {
      const app = express();
      app.use(getLink(new LinksService()));
      const res = await supertest(app).get("/getLink/example");
      expect(res.statusCode).toBe(422);
      expect(res.body.status).toBe("error");
      expect(res.body.error).toBe("PARAMS_VALIDATION_FAIL");
    }
  );
});
