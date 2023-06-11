import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    index: true,
    unique: true,
  },
  shortId: {
    type: Number,
    index: true,
    unique: true,
  },
});

export const Link = mongoose.model("Link", linkSchema);
