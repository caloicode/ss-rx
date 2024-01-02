import express from "express";
import puppeteer from "puppeteer";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// $$1
// app.get('/capture', async (req, res) => {
//   const url = req.query.url;

//   if (!url) {
//     return res.status(400).send('Please provide a URL parameter.');
//   }

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(url, { waitUntil: 'domcontentloaded' });

//   const screenshot = await page.screenshot();

//   res.setHeader('Content-Type', 'image/png');
//   res.setHeader('Content-Disposition', 'attachment; filename=website_capture.png');
//   res.end(screenshot);

//   await browser.close();
// });

// $$/
var patientName;
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/post", (req, res) => {
  patientName = req.body.name;
  res.redirect("/print");
});

app.get("/print", (req, res) => {
  res.render("index.ejs", { name: patientName, port: port });
});

app.get('/rx', (req, res) => {
  res.render('rx.ejs')
})

// $$2
// app.get('/capture', async (req, res) => {
//   const url = req.query.url;

//   if (!url) {
//     return res.status(400).send('Please provide a URL parameter.');
//   }

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate to the URL and wait for the DOM to be loaded
//   await page.goto(url, { waitUntil: 'domcontentloaded' });

//   // Get the viewport size dynamically based on the device's screen size
//   const viewportSize = await page.evaluate(() => {
//     return {
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };
//   });

//   // Set the viewport size
//   await page.setViewport(viewportSize);

//   // Capture the screenshot
//   const screenshot = await page.screenshot();

//   // Set the response headers for the image
//   res.setHeader('Content-Type', 'image/png');
//   res.setHeader('Content-Disposition', 'attachment; filename=website_capture.png');

//   // Send the screenshot as the response
//   res.end(screenshot);

//   // Close the browser
//   await browser.close();
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// $$3
// app.get('/capture', async (req, res) => {
//   const url = req.query.url;

//   if (!url) {
//     return res.status(400).send('Please provide a URL parameter.');
//   }

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate to the URL and wait for the DOM to be loaded
//   await page.goto(url, { waitUntil: 'domcontentloaded' });

//   // Get the current timestamp
//   const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');

//   // Get the viewport size dynamically based on the device's screen size
//   const viewportSize = await page.evaluate(() => {
//     return {
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };
//   });

//   console.log(viewportSize);

//   // Set the viewport size
//   await page.setViewport(viewportSize);

//   // Capture the screenshot
//   const screenshot = await page.screenshot();

//   // Set the response headers for the image
//   res.setHeader('Content-Type', 'image/png');

//   // Set the filename with a timestamp
//   const filename = `Rx_${timestamp}.png`;
//   res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

//   // Send the screenshot as the response
//   res.end(screenshot);

//   // Close the browser
//   await browser.close();
// });

// $$4

app.get("/capture", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Please provide a URL parameter.");
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the viewport size to 2560x1440
  await page.setViewport({ width: 2560, height: 1440 });

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
