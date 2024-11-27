const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleDeleleUrl,
  handleGetAnalaytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.delete("/:id", handleDeleleUrl);
router.get("/analytics", handleGetAnalaytics);

module.exports = router;
