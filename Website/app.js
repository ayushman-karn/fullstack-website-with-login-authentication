//server for the website
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Form = require("./model/form");

//connecting to mongoDB
const dbURI = "foobar";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database db-1");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

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

app.post("/Signup", (req, res) => {
  const form = new Form(req.body);
  form
    .save()
    .then(() => {
      res.redirect("/Signup");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.render("404");
});
