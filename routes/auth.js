const router = require("express").Router();
const fs = require("fs");
const passport = require("passport");
const InstagramStrategy = require("passport-instagram").Strategy;
INSTAGRAM_CLIENT_ID = "1324208351471430";
INSTAGRAM_CLIENT_SECRET = "cb1bbe0a5928e2f22d69abb49017ae37";
const User = require("../models/users");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/", (req, res) => {
  console.log("auth");
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new InstagramStrategy(
    {
      clientID: INSTAGRAM_CLIENT_ID,
      clientSecret: INSTAGRAM_CLIENT_SECRET,
      callbackURL:
        "https://plugg-shop-post-earn-backend.onrender.com/auth/instagram/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Save the access token and profile data to the database
      User.findOneAndUpdate(
        { instagramId: profile.id },
        {
          accessToken: accessToken,
          profile: profile,
        },
        { upsert: true },
        function (err, user) {
          if (err) {
            return done(err);
          }
          return done(null, user);
        }
      );
    }
  )
);

router.get(
  "/instagram",
  passport.authenticate("instagram", {
    scope: ["user_profile", "user_media"],
    response_type: "code",
  })
);

router.get(
  "/instagram/callback",
  passport.authenticate("instagram"),
  function (req, res) {
    const accessToken = req.user.accessToken;
    const userProfile = req.user.profile;
    // Send the access token and profile data as a response
    res.send({
      accessToken: accessToken,
      userProfile: userProfile,
    });
  }
);

module.exports = router;
