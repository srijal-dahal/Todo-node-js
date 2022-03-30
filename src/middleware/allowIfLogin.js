const asyncHandler = require("./asyncHandler");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const messageHandler = require("../utils/messageHandler");
exports.allowIfLogin = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  if (!userId) {
    return res
      .status(400)
      .send(messageHandler(false, "User Id is required", 400));
  }
  User.findById(userId, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      return res.status(404).send(messageHandler(false, "User not found", 404));
    }
    const authcookie = req.cookies.authorization;
  
    jwt.verify(authcookie, keys.signature, (err) => {
      if (err) return next(err);
    });
  });
});
