import { expect } from "chai";
import express from "express";
import supertest from "supertest";
import { exceptionHandler } from "./exceptionHandler";

describe("exceptionHandler", () => {
  it("should respond with INTERNAL_SERVER_ERROR if an exception is thrown", async () => {
    const app = express();
    app.get("/", () => {
      throw new Error();
    });
    app.use(exceptionHandler(false));
    const res = await supertest(app).get("/");
    expect(res.statusCode).to.equal(500);
    expect(res.body.status).to.equal("error");
    expect(res.body.error).to.equal("INTERNAL_SERVER_ERROR");
  });

  it("should not intefere if an expection wasn't thrown", async () => {
    const app = express();
    app.get("/", (_req, res) => {
      res.json({ status: "success" });
    });
    app.use(exceptionHandler(false));
    const res = await supertest(app).get("/");
    expect(res.statusCode).to.equal(200);
    expect(res.body.status).to.equal("success");
  });
});
