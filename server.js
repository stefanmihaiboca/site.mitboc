const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mariadb = require("mariadb");
const app = express();
const expressLayouts = require('express-ejs-layouts');
app.set('layout', 'layout');
app.use(expressLayouts);

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "contact",
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index', { layout: 'layout' });
});

app.get("/produse", (req, res) => {
  res.render("produse", { layout: 'layout' });
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: 'layout' });
});

app.post("/contact", async (req, res) => {
  const db = await pool.getConnection();
  const body = req.body;
  const query =
    "INSERT INTO contact_tabela (nume, email, telefon, mesaj) VALUES(?, ?, ?, ?)";
  const result = await db.query(query, [
    body.nume,
    body.email,
    body.telefon,
    body.mesaj,
  ]);
  res.render("contact", { layout: 'layout' });
});

app.get("/admin", async (req, res) => {
  const db = await pool.getConnection();
  const body = req.body;
  const query = "SELECT * FROM mesaje";
  const result = await db.query(query);
  console.log(result);
  res.render("admin", {messages: result,layout:'layout'});
});
const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

app.listen(3000);
