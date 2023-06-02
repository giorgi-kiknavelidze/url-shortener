import crypto from "crypto";
import { Link } from "../models";
import { MAX_SHORT_ID } from "../constants";

export class LinksService {
  constructor() {}

  public async addLink(url: string) {
    while (true) {
      try {
        const shortId = crypto.randomInt(0, MAX_SHORT_ID + 1);
        const dbResult = await Link.findOneAndUpdate(
          { url },
          { $setOnInsert: { url, shortId: shortId } },
          { upsert: true, new: true }
        ).lean();
        return { url: dbResult.url, shortId: dbResult.shortId };
      } catch (err) {
        if (
          !(
            err instanceof Error &&
            err.name === "MongoServerError" &&
            "code" in err &&
            err["code"] === 11000
          )
        )
          throw err;
      }
    }
  }

  public async getLink(shortId: number) {
    return (await Link.findOne({ shortId }))?.url ?? null;
  }
}
