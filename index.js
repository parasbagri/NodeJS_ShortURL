const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const app = express();
const PORT = 2000;
// connection to mongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/urlshoter");
// second middleware
app.use("/url", (req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// middlewares jo incommings body data ko parse kar sake
app.use(express.json());
app.use("/url", urlRoute);

// reRite URL
app.get("/:shortURL", async (req, res) => {
  const shortURL = req.params.shortURL;
  console.log("shortURL : ", shortURL);
  const url = await URL.findOneAndUpdate(
    { shortURL },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
          // ipAddress: req.ip,
          // userAgent: req.headers["user-agent"]
        },
      },
    }
  );
  console.log(url);
  if (url) {
    return res.redirect(url.redirectURL);
  }
  return res.status(404).send("URL not found Paras.");
});
app.listen(PORT, () => console.log("App listening on port " + PORT));
