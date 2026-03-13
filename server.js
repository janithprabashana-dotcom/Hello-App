const express = require("express");
const path = require("path");

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files (CSS, images) from /public
app.use(express.static(path.join(__dirname, "public")));

let userName = "";

// UI page (like image1)
app.get("/", (req, res) => {
  res.send(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tools Activity 01</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <main class="page">
      <section class="card">
        <h1 class="title">Welcome</h1>
        <p class="subtitle">Please enter your name to receive a greeting.</p>

        <form class="form" method="POST" action="/submit-name">
          <input class="input" type="text" name="name" placeholder="Enter your name" required />
          <button class="btn" type="submit">Get Greeting</button>
        </form>
      </section>
    </main>
  </body>
</html>`);
});

// POST: store name and redirect
app.post("/submit-name", (req, res) => {
  userName = (req.body.name || "").trim();
  res.redirect("/greeting");
});

// Greeting page (like image2)
app.get("/greeting", (req, res) => {
  const safeName = userName ? userName : "Guest";

  res.send(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Greeting</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <main class="page">
      <section class="card card--small">
        <h1 class="title">Hello, ${escapeHtml(safeName)}!</h1>
        <a class="link" href="/">Go Back</a>
      </section>
    </main>
  </body>
</html>`);
});

app.listen(port, () => {
  console.log(`Server started at Port: ${port}`);
});

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}