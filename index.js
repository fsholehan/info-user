const express = require("express");
const app = express();
const UAParser = require("ua-parser-js");
const requestIp = require("request-ip");

// Membuat middleware untuk mengambil informasi user agent dari setiap permintaan
app.use((req, res, next) => {
  const parser = new UAParser();
  const userAgent = req.headers["user-agent"];
  const result = parser.setUA(userAgent).getResult();
  req.userAgent = result;
  next();
});

app.use(requestIp.mw());

// Contoh route untuk menampilkan informasi user agent dalam format JSON
app.get("/", (req, res) => {
  try {
    const userAgent = req.userAgent;
    const ip = req.clientIp;

    res.status(200).json({ status: "success", data: { ...userAgent, ip } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message, data: null });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
