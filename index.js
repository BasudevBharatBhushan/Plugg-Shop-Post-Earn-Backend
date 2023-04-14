const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

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
