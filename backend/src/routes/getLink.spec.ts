import express from "express";
import { expect } from "chai";
import supertest from "supertest";
import sinon from "sinon";
import { getLink } from "./getLink";
import { LinksService } from "../services";

describe("GET /getLink", () => {
  afterEach(() => sinon.restore());

  it("should respond with correct shortId", async () => {
    const linksService = new LinksService();
    sinon.stub(linksService, "getLink").returns(Promise.resolve("example.com"));
    const app = express();
    app.use(getLink(linksService));
    const res = await supertest(app).get("/getLink/100");
    expect(res.statusCode).to.equal(200);
    expect(res.body.link).to.equal("example.com");
  });

  it("should respond with PARAMS_VALIDATION_FAIL error if invalid input is provided", async () => {
    const app = express();
    app.use(getLink(new LinksService()));
    const res = await supertest(app).get("/getLink/example");
    expect(res.statusCode).to.equal(422);
    expect(res.body.status).to.equal("error");
    expect(res.body.error).to.equal("PARAMS_VALIDATION_FAIL");
  });
});
