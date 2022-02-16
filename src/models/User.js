const { Schema,model } = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
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
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});
UserSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this, _id }, "hah", {
    expiresIn: "7d",
  });
};
function validateUser(user) {
  const schema = joi.object({
    name: joi.string().min(3),
    email: joi.string().required().min(5).max(255).email(),
    password: joi.string().required().min(8).max(255),
    accessToken: joi.string(),
  });
  return schema.validate(user);
}
const User = model("User", UserSchema);
module.exports = { User, validateUser };
