const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/api/books", async (req, res) => {
  const { bookname } = req.query;
  if (!bookname) return res.status(400).json({ error: "Missing bookname" });

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookname)}&key=${process.env.BOOKS_API_KEY}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  res.json(data);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
