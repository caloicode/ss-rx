import express from "express";
import puppeteer from "puppeteer";

const app = express();
const port = process.env.PORT || 3000;
// const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// $$/
var rx;
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/post", (req, res) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  rx = {
    patientName: req.body.patientName,
    date: formatDate(req.body.date),
    address: req.body.address,
    age: req.body.age,
    rx: req.body.rx,
  };
  res.redirect("/preview");
});

app.get("/preview", (req, res) => {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol; // Use x-forwarded-proto if available
  const hostname = req.headers.host || process.env.HOSTNAME || "localhost";
  const fullUrl = `${protocol}://${hostname}${req.originalUrl}`;
  // console.log(fullUrl);

  res.render("rx.ejs", { rx, fullUrl });
});

app.get("/capture", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Please provide a URL parameter.");
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the viewport size to 2560x1440
  // await page.setViewport({ width: 2560, height: 1440 });
  // await page.setViewport({ width: 480, height: 720 });
  await page.setViewport({ width: 480, height: 720, deviceScaleFactor: 2 });

  // Navigate to the URL and wait for the DOM to be loaded
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Capture the screenshot
  const screenshot = await page.screenshot();

  // Set the response headers for the image
  res.setHeader("Content-Type", "image/png");

  // Set the filename with a timestamp
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\..+/, "");
  const filename = `Rx_${timestamp}.png`;
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

  // Send the screenshot as the response
  res.end(screenshot);

  // Close the browser
  await browser.close();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
