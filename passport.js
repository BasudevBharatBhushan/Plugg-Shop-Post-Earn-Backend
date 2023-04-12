// const InstagramStrategy = require("passport-instagram").Strategy;
// const passport = require("passport");
// INSTAGRAM_CLIENT_ID = "1324208351471430";
// INSTAGRAM_CLIENT_SECRET = "cb1bbe0a5928e2f22d69abb49017ae37";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new InstagramStrategy(
//     {
//       clientID: INSTAGRAM_CLIENT_ID,
//       clientSecret: INSTAGRAM_CLIENT_SECRET,
//       callbackURL: "/auth/instagram/callback", // Make sure this matches your route
//       passReqToCallback: true, // Add this option to pass the request object to the callback
//     },
//     (req, accessToken, refreshToken, profile, done) => {
//       console.log("Instagram authentication successful"); // Add console log
//       console.log("Profile:", profile); // Add console log
//       // Your authentication logic here
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
