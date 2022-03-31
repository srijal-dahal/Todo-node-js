const asyncHandler = require("../middleware/asyncHandler");
const messageHandler = require("../utils/messageHandler");
const { validateUser, User } = require("../models/User");

module.exports.register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const { error } = validateUser(req.body);
  if (error)
    return res.status(401).send(messageHandler(false, error.message, 401));

  User.findOne({ email: email }, async (err, existingUser) => {
    if (err)
      return res
        .status(401)
        .send(
          messageHandler(false, "Something went wrong! Please try again", 401)
        );
    if (existingUser)
      return res
        .status(401)
        .send(messageHandler(false, "User already exists", 401));
  });
  const user = await User.create(
    {
      name: name,
      email: email,
      password: password,
    },
    (err, user) => {
      if (err)
        return res
          .status(401)
          .send(
            messageHandler(false, "Something went wrong! Please try again", 401)
          );
      if (user) {
        return res.status(200).send(messageHandler(true, "User created", 200));
      }
    }
  );
  const token = await user.generateToken(user);

  const isSecure = process.env.NODE_ENV != "development";
  await res.cookie("authorization", token, {
    maxAge: 1000 * 7 * 24 * 60 * 60,
    httpOnly: false,
    secure: isSecure,
    sameSite: "none",
  });
  let userData = {
    uid: user._id,
    name: user.name,
    email: user.email,
  };
  return res
    .status(201)
    .send(
      messageHandler(true, { message: "User created", userData: userData }, 201)
    );
});

module.exports.login = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res.status(401).send(messageHandler(false, error.message, 401));
  const user = await User.login(req.body.email, req.body.password);
  if (user.message)
    return res.status(401).send(messageHandler(false, user.message, 401));
  const token = await user.generateToken(user);
  const isSecure = process.env.NODE_ENV != "development";
  res.cookie("authorization", token, {
    maxAge: 1000 * 7 * 24 * 60 * 60,
    httpOnly: false,
    secure: isSecure,
    sameSite: "none",
  });
  let userData = {
    uid: user._id,
    name: user.name,
    email: user.email,
  };
  return res
    .status(201)
    .send(
      messageHandler(true, { message: "User Login", userData: userData }, 201)
    );
});
