import express from "express";
import { LinksService } from "../services";
import { GetLinkParams, SParams } from "../models";
import { decodeShortId } from "../functions";
import { validate } from "class-validator";

export const s = (linksService: LinksService) =>
  express.Router().get("/s/:encodedShortId", async (req, res) => {
    const params_initial = new SParams(req.params);

    const errors_initial = await validate(params_initial);
    if (errors_initial.length > 0) {
      res.status(422).json({
        status: "error",
        error: "PARAMS_VALIDATION_FAIL",
      });
      return;
    }

    const params_processed = new GetLinkParams({
      shortId: decodeShortId(params_initial.encodedShortId).toString(),
    });
    const errors_processed = await validate(params_processed);
    if (errors_processed.length > 0) {
      res.status(422).json({
        status: "error",
        error: "PARAMS_VALIDATION_FAIL",
      });
      return;
    }

    const link = await linksService.getLink(params_processed.shortId);
    if (link === null) {
      res.json({
        status: "error",
        error: "LINK_NOT_FOUND",
      });
      return;
    }
    res.redirect(
      307,
      link.startsWith("http://") || link.startsWith("https://")
        ? link
        : `http://${link}`
    );
  });
