const mongoose = require("mongoose");
const { schema } = require("./post");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default: "i'm new here!" },
  posts: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("User", userSchema);
