const asyncHandler = require("../middleware/asyncHandler");
const messageHandler = require("../utils/messageHandler");
const factory = require("../middleware/factoryHandler");

const { User } = require("../models/User");
const { Todo } = require("../models/ToDo");
module.exports.updateUser = factory.updateOne(User);

module.exports.updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const doc = await User.findById(userId);
    if (!doc) {
        return res
            .status(404)
            .send(messageHandler(false, "User not found", 404));
    }
    const todo = await User.findByIdAndUpdate(userId, {
        ...req.body,
        user: userId,
    });
    res.status(200).send(messageHandler(true, "User updated", 200));
});

//module.exports.deleteUser = factory.deleteOne(User);
module.exports.deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
        return res
            .status(404)
            .send(messageHandler(false, "User not found", 404));
    }
    await User.findByIdAndDelete(userId);
    await Todo.deleteMany({ user: userId });
    return res
        .status(201)
        .send(messageHandler(true, "User deleted successfully", 201));
});
module.exports.getUsers = factory.getAll(User);

module.exports.getUser = factory.getOne(User);
