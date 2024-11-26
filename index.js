const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = 2000;
// connection to mongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/urlshoter");

// middlewares jo incommings body data ko parse kar sake
app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => console.log("App listening on port " + PORT));
