router.get("/instagram/callback", async (req, res) => {
  const code = req.query.code.replace("#_", ""); // remove #_ from code
  try {
    // Exchange authorization code for access token
    const tokenParams = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI,
      code: code,
    };
    const tokenResponse = await axios.post(
      TOKEN_URL,
      querystring.stringify(tokenParams)
    );
    const access_token = tokenResponse.data.access_token;

    // Retrieve user information
    const meUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`;
    const meResponse = await axios.get(meUrl);
    const user_data = meResponse.data;
    const user_id = user_data.id;
    const username = user_data.username;

    // Store user information in MongoDB
    const newUser = new User({
      user_id: user_id,
      username: username,
      access_token: access_token,
    });
    newUser.save((err, savedUser) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send("Error in registering user, please try again later.");
      } else {
        console.log("Saved user:", savedUser);
        res.redirect("/");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
