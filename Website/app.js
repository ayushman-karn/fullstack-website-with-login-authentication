//server for the website
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.use(express.static("public"));

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/Home/index.html");
  res.render("index");
  //res.redirect("/Home/index.html");
});

//app.get("/Home", (req, res) => {
//res.redirect("/");
//res.sendFile(__dirname + "/Home/index.html");
//});

app.get("/Signup", (req, res) => {
  res.render("signup");
});

app.use((req, res) => {
  res.render("404");
});
