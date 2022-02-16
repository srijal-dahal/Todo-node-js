const asyncHandler = require("../middleware/asyncHandler");
const messageHandler = require("../utils/messageHandler");
const bcrypt = require("bcrypt");
const { validateUser, User } = require("../models/User");

module.exports.register = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(401).send(messageHandler(false, error.message, 401));
  const checkUser = await User.find({
    email: req.body.email,
  });
  if (checkUser.length <= 0) {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "basic",
    });

    const token = await user.generateToken(user);
    user.accessToken = token;
    let userData = {
      uid: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      token: token,
    };

    return res.status(201).json(messageHandler(true, userData, 201));
  } else {
    return res
      .status(401)
      .send(messageHandler(false, "Use Another Email", 401));
  }
});

module.exports.login = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(401).send(messageHandler(false, error.message, 401));
  const user = await User.findOne({ email });
  if (!user) return Error("Invalid Email");
  const userPassword = await bcrypt.compare(password, user.password);
  if (!userPassword) return Error("Invalid Password");
  if (user.message)
    return res.status(401).send(messageHandler(false, user.message, 401));
  const accesstoken = await user.generateToken(user);
  await User.findByIdAndUpdate(user._id, accesstoken);
  let userData = {
    uid: user._id,
    name: user.name,
    role: user.role,
    email: user.email,
    token: accesstoken,
  };
  return res.status(201).send(messageHandler(true, userData, 201));
});
