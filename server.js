const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// If your phone has a modern camera (unlike my iPhone 4S)
// you might wanna make this bigger.
app.use(bodyParser.json({ limit: "10mb" }));

// TODO: handle requests
// Store the single image in memory.
let latestPhoto = null;

// Upload the latest photo for this session
app.post("/", (req, res) => {
  // Very light error handling
  if (!req.body) return res.sendStatus(400);

  console.log("got photo");

  // Update the image and respond happily
  latestPhoto = req.body.image;
  res.sendStatus(200);
});

const port = process.env.PORT || 5005;
app.listen(port);

console.log(`Grill server listening on ${port}`);
