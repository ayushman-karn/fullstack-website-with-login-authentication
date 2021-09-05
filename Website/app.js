//server for the website
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Form = require("./model/form");
const bcrypt = require("bcrypt");
require("dotenv").config();

//connecting to mongoDB
mongoose.set("useCreateIndex", true);
const dbURI = process.env.dbURI;
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

const saltRound = 10;

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/Home/index.html");
  res.render("index");
  //res.redirect("/Home/index.html");
});

//app.get("/Home", (req, res) => {
//res.redirect("/");
//res.sendFile(__dirname + "/Home/index.html");
//});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/login/:email", async (req, res) => {
  console.log(req.params.email.substr(1));
  const details = await Form.findOne({ email: req.params.email.substr(1) });
  console.log(details);
  if (details.verification == true) {
    details.verification = false;
    details.save().then(() => {
      res.render("user", {
        name: details.firstName + " " + details.lastName,
        bio: details.bio,
        action: "/login/:" + req.params.email.substr(1),
      });
    });
  } else res.redirect("/login");
});

app.post("/login/:email", async (req, res) => {
  const details = await Form.findOne({ email: req.params.email.substr(1) });
  details.bio = req.body.bio;
  await details.save();
  res.render("user", {
    name: details.firstName + " " + details.lastName,
    bio: details.bio,
    action: "/login/:" + req.params.email.substr(1),
  });
});

app.get("/Signup", (req, res) => {
  res.render("signup");
});

app.post("/Signup", (req, res) => {
  let password = req.body.pass;

  bcrypt.genSalt(saltRound, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      req.body.pass = hash;
      let form = new Form(req.body);
      form.bio = "";
      form.verification = false;
      form
        .save()
        .then(() => {
          res.redirect("/Signup");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const details = await Form.findOne({ email: req.body.email });
  console.log(details);
  bcrypt
    .compare(req.body.password, details.pass)
    .then(async (result) => {
      console.log(result);
      if (result) {
        details.verification = true;
        await details.save();
        res.redirect(`/login/:${req.body.email}`);
        //res.send(`Hello ${details[0].firstName}`);
        // res.render("user", {
        //   name: details.firstName + " " + details.lastName,
        // });
      } else res.redirect("/login");
    })
    .catch((err) => console.error(err));
});

app.use((req, res) => {
  res.render("404");
});
