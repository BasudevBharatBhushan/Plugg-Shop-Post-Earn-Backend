const express = require("express");
const axios = require("axios");
const User = require("../models/users");

const router = express.Router();

const session = require("express-session");
const passport = require("passport");
const InstagramStrategy = require("passport-instagram").Strategy;

router.use(
  session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  User.findById(user.id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new InstagramStrategy(
    {
      clientID: "555929540008429",
      clientSecret: "597c05f76db7c66b1c07d8fa00b396dd",
      callbackURL:
        "https://plugg-shop-post-earn-backend.onrender.com/auth/instagram/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const username = profile.username;
      const user_id = profile.id;

      const user = User.findOneAndUpdate(
        { user_id },
        { username },
        { new: true, upsert: true }
      );

      const responseObj = {
        token: accessToken,
        user: {
          id: user._id,
          user_id: user.user_id,
          username: user.username,
        },
      };

      return done(null, responseObj);
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
  passport.authenticate("instagram", {
    successRedirect: "https://plugg-shop-post-earn.onrender.com",
    failureRedirect: "/auth/failed",
  })
);

router.get("/failed", (req, res) => {
  res.send("Failed to authenticate");
});

router.get("/", (req, res) => {
  res.send("<h1>Hello, world!</h1>");
});

module.exports = router;
