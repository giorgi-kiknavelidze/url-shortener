import express from "express";
import supertest from "supertest";
import { s } from "./s";
import { LinksService } from "../services";

describe("GET /s", () => {
  afterEach(() => jest.restoreAllMocks());

  it("should respond with correct shortId", async () => {
    const linksService = new LinksService();
    jest.spyOn(linksService, "getLink").mockClear()
      .mockReturnValue(Promise.resolve("https://example.com"));
    const app = express();
    app.use(s(linksService));
    const res = await supertest(app).get("/s/32");
    expect(res.statusCode).toBe(307);
    expect(res.header.location).toBe("https://example.com");
  });

  it(
    "should respond with PARAMS_VALIDATION_FAIL error if invalid input is provided",
    async () => {
      const app = express();
      app.use(s(new LinksService()));
      const res = await supertest(app).get("/s/example");
      expect(res.statusCode).toBe(422);
      expect(res.body.status).toBe("error");
      expect(res.body.error).toBe("PARAMS_VALIDATION_FAIL");
    }
  );
});
