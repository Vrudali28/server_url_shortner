// server.js
const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const urlDatabase = {};

app.post("/api/shorten", (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = "http://localhost:3002/" + shortid.generate();
  urlDatabase[shortUrl] = originalUrl;
  res.json({ shortUrl });
});

app.get("/:shortUrl", (req, res) => {
  const { shortUrl } = req.params;
  const originalUrl = urlDatabase[shortUrl];
if (originalUrl) {
  res.redirect(originalUrl);
} else {
  res.status(404).json({ error: "URL not found" });
}
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
