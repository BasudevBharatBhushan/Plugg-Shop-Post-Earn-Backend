const express = require("express");
const axios = require("axios");
const User = require("../models/users");
const querystring = require("querystring");

const router = express.Router();

const CLIENT_ID = "1324208351471430";
const CLIENT_SECRET = "cb1bbe0a5928e2f22d69abb49017ae37";
const REDIRECT_URI =
  "https://plugg-shop-post-earn-backend.onrender.com/auth/instagram/callback";
const AUTH_URL = "https://api.instagram.com/oauth/authorize";
const TOKEN_URL = "https://api.instagram.com/oauth/access_token";

router.get("/instagram", (req, res) => {
  const authParams = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "user_profile,user_media",
    response_type: "code",
  };
  const authUrl = `${AUTH_URL}?${querystring.stringify(authParams)}`;
  res.redirect(authUrl);
});

router.get("/instagram/callback", async (req, res) => {
  const code = req.query.code.replace("#_", ""); // remove #_ from code
  try {
    res.redirect("/");
    // Exchange authorization code for access token
    // const tokenParams = {
    //   client_id: CLIENT_ID,
    //   client_secret: CLIENT_SECRET,
    //   grant_type: "authorization_code",
    //   redirect_uri: REDIRECT_URI,
    //   code: code,
    // };
    // const tokenResponse = await axios.post(
    //   TOKEN_URL,
    //   querystring.stringify(tokenParams)
    // );
    // const access_token = tokenResponse.data.access_token;

    // // Retrieve user information
    // const meUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`;
    // const meResponse = await axios.get(meUrl);
    // const user_data = meResponse.data;
    // const user_id = user_data.id;
    // const username = user_data.username;

    // // Store user information in MongoDB
    // const newUser = new User({
    //   user_id: user_id,
    //   username: username,
    //   access_token: access_token,
    // });
    // newUser.save((err, savedUser) => {
    //   if (err) {
    //     console.error(err);
    //     res
    //       .status(500)
    //       .send("Error in registering user, please try again later.");
    //   } else {
    //     console.log("Saved user:", savedUser);
    //     res.redirect("/");
    //   }
    // });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/", (req, res) => {
  res.send("<h1>Hello, world!</h1>");
});

module.exports = router;
