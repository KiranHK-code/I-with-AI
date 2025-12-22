const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    let text = "";

    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } 
    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } 
    else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    fs.unlinkSync(filePath); // delete uploaded file

    res.json({ extractedText: text });
  } catch (err) {
    res.status(500).json({ error: "Failed to process resume" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
