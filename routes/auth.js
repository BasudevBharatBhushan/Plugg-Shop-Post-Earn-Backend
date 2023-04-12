const router = require("express").Router();
const fs = require("fs");
const passport = require("passport");
const InstagramStrategy = require("passport-instagram").Strategy;
INSTAGRAM_CLIENT_ID = "1324208351471430";
INSTAGRAM_CLIENT_SECRET = "cb1bbe0a5928e2f22d69abb49017ae37";

const CLIENT_URL = "https://www.google.com";

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
      // Save profile data to file
      fs.writeFile("profiles.json", JSON.stringify(profile), function (err) {
        if (err) throw err;
        console.log("Profile data saved to file");
      });

      // Return the profile to serializeUser
      return done(null, profile);
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
  "/auth/instagram/callback",
  // passport.authenticate("instagram", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect(CLIENT_URL);
  }
);

module.exports = router;
