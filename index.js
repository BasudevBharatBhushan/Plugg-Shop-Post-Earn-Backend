const express = require("express");
const authRoute = require("./routes/passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Plugg Shop Post and Earn Server is working");
});

app.listen("5000", () => {
  console.log("Server is running!");
});
