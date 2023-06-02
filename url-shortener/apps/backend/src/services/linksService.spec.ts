import { expect } from "chai";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { LinksService } from "./linksService";

describe("LinksService", () => {
  let mongoServer: MongoMemoryServer = new MongoMemoryServer();
  let linksService: LinksService = new LinksService();

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("getLink", () => {
    it("should return null for non-existent link", async () => {
      expect(await linksService.getLink(1)).to.be.null;
    });
  });

  describe("addLink", () => {
    it("should add the link and make it retriveable", async () => {
      const link = "https://example.com";
      const { shortId } = await linksService.addLink(link);
      expect(shortId).not.to.be.undefined;
      expect(await linksService.getLink(shortId!)).to.equal(link);
    });
  });
});
