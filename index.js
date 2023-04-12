const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");
const app = express();
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://admin-basudev:OoAkYrt6dz3DGZQF@cluster0.nbsww.mongodb.net/InstaDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Plugg Shop Post and Earn Server is working");
});

app.listen("5000", () => {
  console.log("Server is running!");
});
