const asyncHandler = require("../middleware/asyncHandler");
const messageHandler = require("../utils/messageHandler");
const factory = require("../middleware/factoryHandler");

const { User } = require("../models/User");

module.exports.updateUser = factory.updateOne(User);

module.exports.deleteUser = factory.deleteOne(User);

module.exports.getUsers = factory.getAll(User);

module.exports.getUser = factory.getOne(User);
