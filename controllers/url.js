// const { nanoid } = require("nanoid");
const shortid = require("shortid");
const URL = require("../models/url");
// import { nanoid } from "nanoid";
// ye database file hai isme hum nanoid pass karenge

// Handle generating new short URL
async function handleGenerateNewShortUrl(req, res) {
  //   const shortUrl = nanoid(6); // Generate a 6-character short URL
  const shorID = shortid(); // Generate a 6-character short URL
  const body = req.body;
  if (!body) return res.status(404).json({ Mes: "URL is required" });
  //   const existingUrl = await Url.findOne({ longUrl: req.body.longUrl });
  await URL.create({
    shortId: shorID,
    redirectURL: body.url,
    visitHistory: [],
  });
  res.json({ id: shorID });
}

module.exports = {
  handleGenerateNewShortUrl,
};
