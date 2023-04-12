const router = require("express").Router();
const passport = require("passport");
const InstagramStrategy = require("passport-instagram").Strategy;
INSTAGRAM_CLIENT_ID = "1324208351471430";
INSTAGRAM_CLIENT_SECRET = "cb1bbe0a5928e2f22d69abb49017ae37";

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

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

passport.use(
  new InstagramStrategy(
    {
      clientID: INSTAGRAM_CLIENT_ID,
      clientSecret: INSTAGRAM_CLIENT_SECRET,
      callbackURL: "/auth/instagram/callback", // Make sure this matches your route
      passReqToCallback: true, // Add this option to pass the request object to the callback
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log("Instagram authentication successful"); // Add console log
      console.log("Profile:", profile); // Add console log
      // Your authentication logic here
    }
  )
);

router.get("/instagram", passport.authenticate("instagram"));
router.get(
  "/instagram/callback",
  passport.authenticate("instagram", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    console.log("Instagram callback route hit"); // Add console log
    console.log("Request query:", req.query); // Add console log
    console.log("Request user:", req.user); // Add console log
  }
);

module.exports = router;
