const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
