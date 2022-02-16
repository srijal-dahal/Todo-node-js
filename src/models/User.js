const { Schema } = require("mongooser");
const jwt = require("jsonwebtoken");
const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  accessToken: {
    type: String,
  },
});
UserSchema.pre("save", async (next) => {
  next();
});
UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this, _id }, "hah", {
    expiresIn: "7d",
  });
};
const User = model("User", UserSchema);
