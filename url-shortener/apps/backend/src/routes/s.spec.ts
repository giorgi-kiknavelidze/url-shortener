import express from "express";
import { expect } from "chai";
import supertest from "supertest";
import sinon from "sinon";
import { s } from "./s";
import { LinksService } from "../services";

describe("GET /s", () => {
  afterEach(() => sinon.restore());

  it("should respond with correct shortId", async () => {
    const linksService = new LinksService();
    sinon
      .stub(linksService, "getLink")
      .returns(Promise.resolve("https://example.com"));
    const app = express();
    app.use(s(linksService));
    const res = await supertest(app).get("/s/32");
    expect(res.statusCode).to.equal(307);
    expect(res.header.location).to.equal("https://example.com");
  });

  it("should respond with PARAMS_VALIDATION_FAIL error if invalid input is provided", async () => {
    const app = express();
    app.use(s(new LinksService()));
    const res = await supertest(app).get("/s/example");
    expect(res.statusCode).to.equal(422);
    expect(res.body.status).to.equal("error");
    expect(res.body.error).to.equal("PARAMS_VALIDATION_FAIL");
  });
});