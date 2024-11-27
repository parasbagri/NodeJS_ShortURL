// const { nanoid } = require("nanoid");
const shortid = require("shortid");
const URL = require("../models/url");
const mongoose = require("mongoose");
// import { nanoid } from "nanoid";
// ye database file hai isme hum nanoid pass karenge

// // Handle generating new short URL
// async function handleGenerateNewShortUrl(req, res) {
//   //   const shortUrl = nanoid(6); // Generate a 6-character short URL
//   const shorID = shortid(); // Generate a 6-character short URL
//   const body = req.body;
//   if (!body) return res.status(404).json({ Mes: "URL is required" });
//   //   const existingUrl = await Url.findOne({ longUrl: req.body.longUrl });
//   await URL.create({
//     shortId: shorID,
//     redirectURL: body.url,
//     visitHistory: [],
//   });
//   res.json({ id: shorID });
// }

// delete generateShortURL
async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ message: "Redirect URL is required" });
  }

  try {
    const shortID = shortid.generate(); // Generate unique ID using shortid

    // Save the new URL with the short ID
    const newUrl = await URL.create({
      shortURL: shortID, // Assign the generated shortID to shortURL
      redirectURL: body.url,
      visitHistory: [],
    });

    res.status(201).json({ shortURL: newUrl.shortURL });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error creating short URL", error });
  }
}

// async function handleDeleleUrl(req, res) {
//   await URL.findByIdAndDelete(req.params.id);
//   res.json({ status: "Deleted" });
// }

// delete controller
async function handleDeleleUrl(req, res) {
  console.log("Running....");
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const result = await URL.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.json({ status: "Deleted" });
}

// GET analaytics API
async function handleGetAnalaytics(req, res) {
  // const shortId = req.params.shortId;
  // console.log("shortURL:", shortId);
  // const result = await URL.findOne({ shortId });
  // console.log(result);
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleDeleleUrl,
  handleGetAnalaytics,
};
