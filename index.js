const express = require("express");
const app = express();
const UAParser = require("ua-parser-js");
const axios = require("axios");

// Membuat middleware untuk mengambil informasi user agent dari setiap permintaan
app.use((req, res, next) => {
  const parser = new UAParser();
  const userAgent = req.headers["user-agent"];
  const result = parser.setUA(userAgent).getResult();
  req.userAgent = result;
  next();
});

// Contoh route untuk menampilkan informasi user agent dalam format JSON
app.get("/", async (req, res) => {
  const userAgent = req.userAgent;
  const getIp = await axios.get("https://api.ipify.org?format=json");
  const ip = await getIp.data.ip;

  res.json({ ...userAgent, ip });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
