const { Schema } = require("mongooser");

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
    
}
const User = model("User", UserSchema);
