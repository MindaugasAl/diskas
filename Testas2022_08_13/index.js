import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import fs from "fs/promises";
import auth from "./middleware/auth.js";
import mysql from "mysql2/promise";

const app = express();
const file = "./database.json";

const database = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "spotify",
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(
  session({
    secret: "labai slapta fraze",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000000,
    },
  }),
);

app.get("/", async (req, res) => {
  const songs = await database.query(
    "SELECT id, song_Name, song_Album FROM songs",
  );
  //   console.log(songs[0]);
  res.render("dataforguest", { songs: songs[0] });
});

app.use("/public", express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/login", (req, res) => {
  const options = {};

  if (req.query.status === "1") {
    options.message = "Vartotojas sėkmingai sukurtas";
    options.status = "success";
  }

  res.render("login", options);
});

app.post("/login", async (req, res) => {
  if (req.body.email === "" || req.body.password === "")
    return res.render("login", {
      message: "Neįvesti prisijungimo duomenys",
      status: "danger",
    });

  try {
    const data = await fs.readFile(file, "utf8");
    if (
      !JSON.parse(data).find(
        (user) =>
          user.email === req.body.email && user.password === req.body.password,
      )
    )
      return res.render("login", {
        message: "Neteisingi prisijungimo duomenys",
        status: "danger",
      });

    req.session.loggedIn = true;
    return res.redirect("/data");
  } catch {
    return res.render("login", {
      message: "Duomenu bazės failas nerastas",
      status: "danger",
    });
  }
});

app.get("/register", async (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  if (
    JSON.stringify(req.body) != "{}" &&
    req.body.name !== "" &&
    req.body.email !== "" &&
    req.body.password !== ""
  ) {
    try {
      let data = await fs.readFile(file, "utf8");
      data = JSON.parse(data);
      if (data.find((user) => user.email === req.body.email))
        return res.render("register", {
          message: "Toks vartotojas jau yra registruotas",
          status: "danger",
        });

      data.push(req.body);
      await fs.writeFile(file, JSON.stringify(data, null, 4));
    } catch {
      await fs.writeFile(file, JSON.stringify([req.body], null, 4));
    }

    return res.redirect("/?status=1");
  }
});

app.get("/data", auth, async (req, res) => {
  const data = await fs.readFile(file, "utf8");
  const users = JSON.parse(data);
  const options = { users };

  options.message = req.query.message;
  options.status = req.query.status;

  const songs = await database.query(
    "SELECT id, song_Name, song_Album FROM songs",
  );
  //   console.log(songs[0]);
  res.render("data", { songs: songs[0] });
});

app.get("/delete/:id", async (req, res) => {
  await database.query("DELETE FROM `songs` WHERE id=?", [req.params.id]);
  res.redirect("/data");
});

app.listen(3000);
