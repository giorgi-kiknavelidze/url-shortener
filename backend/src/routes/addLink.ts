import express from "express";
import { AddLinkBody } from "../models";
import { validate } from "class-validator";
import { LinksService } from "../services";

export const addLink = (linksService: LinksService) =>
  express.Router().post("/addLink", express.json(), async (req, res) => {
    const body = new AddLinkBody(req.body);

    const errors = await validate(body);
    if (errors.length > 0) {
      res.status(422).json({
        status: "error",
        error: "BODY_VALIDATION_FAIL",
      });
      return;
    }
    const link = await linksService.addLink(body.link);
    res.status(200).json({
      status: "success",
      shortId: link.shortId,
    });
  });
