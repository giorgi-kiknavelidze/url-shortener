import express from "express";
import supertest from "supertest";
import sinon from "sinon";
import { addLink } from "./addLink";
import { LinksService } from "../services";

describe("POST /addLink", () => {
  afterEach(() => sinon.restore());

  it("should respond with correct shortId", async () => {
    const linksService = new LinksService();
    sinon.stub(linksService, "addLink").returns(
      Promise.resolve({
        url: "example",
        shortId: 100,
      })
    );
    const app = express();
    app.use(addLink(linksService));
    const res = await supertest(app)
      .post("/addLink")
      .send({ link: "example.com" });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.shortId).toBe(100);
  });

  it(
    "should respond with BODY_VALIDATION_FAIL error if invalid input is provided",
    async () => {
      const app = express();
      app.use(express.json());
      app.use(addLink(new LinksService()));
      const res = await supertest(app).post("/addLink").send({ link: "invalid" });
      expect(res.statusCode).toBe(422);
      expect(res.body.status).toBe("error");
      expect(res.body.error).toBe("BODY_VALIDATION_FAIL");
    }
  );
});
