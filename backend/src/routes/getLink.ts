import express from "express";
import { GetLinkParams } from "../models";
import { validate } from "class-validator";
import { LinksService } from "../services";

export const getLink = (linksService: LinksService) =>
  express.Router().get("/getLink/:shortId", async (req, res) => {
    const params = new GetLinkParams(req.params);

    const errors = await validate(params);
    if (errors.length > 0) {
      res.status(422).json({
        status: "error",
        error: "PARAMS_VALIDATION_FAIL",
      });
      return;
    }
    const link = await linksService.getLink(params.shortId);
    if (link === null) {
      res.json({
        status: "error",
        error: "LINK_NOT_FOUND",
      });
      return;
    }
    res.json({
      status: "success",
      link: link,
    });
  });
