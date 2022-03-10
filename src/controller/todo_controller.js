const asyncHandler = require("../middleware/asyncHandler");
const messageHandler = require("../utils/messageHandler");
const factory = require("../middleware/factoryHandler");
const { Todo, validateTodo } = require("../models/ToDo");
const { User } = require("../models/User");
//module.exports.createTodo = factory.createOne(Todo);
module.exports.createTodo = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { error } = validateTodo(req.body);
    if (error)
        return res.status(404).send(messageHandler(false, error.message, 404));
    const userId = req.params.userId;
    const doc = await User.findById(userId);
    if (!doc) {
        return res
            .status(404)
            .send(messageHandler(false, "User not found", 404));
    }
    const todo = await Todo.create({
        ...req.body,
        user: userId,
    });
    await User.findByIdAndUpdate(userId, {
        $push: { todos: todo },
    });
    const todos = await Todo.find({ userId }).populate({
        path: "user",
        select: "name email createdAt updatedAt",
    });
    res.status(201).send(
        messageHandler(true,  todos , 201)
    );
});

module.exports.getTodos = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const doc = await User.findById(userId);
    if (!doc) {
        return res
            .status(404)
            .send(messageHandler(false, "User not found", 404));
    }
    const todos = await Todo.find({ user: userId }).populate({
        path: "user",
        select: "name email createdAt updatedAt",
    });
    return res.status(200).send(messageHandler(true, { todos: todos }, 200));
});

module.exports.updateTodo = asyncHandler(async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error)
        return res.status(404).send(messageHandler(false, error.message), 404);
    const userId = req.params.userId;
    const doc = await Todo.findById(userId);
    if (!doc) {
        return res
            .status(404)
            .send(messageHandler(false, "User not found", 404));
    }
    const todo = await Todo.findByIdAndUpdate(userId, {
        ...req.body,
        user: userId,
    });
});

module.exports.deleteTodo = factory.deleteOne(Todo);

/*module.exports.getTodos = factory.getAll(Todo, {
    path: "user",
    select: "name email createdAt updatedAt",
});
*/
module.exports.getTodo = factory.getOne(Todo);

exports.queryTodo = asyncHandler(async (req, res) => {
    const { name } = req.query;
    const filterQuery = name
        ? {
              name: { $regex: name, $options: "i" },
          }
        : {};
    const queryTodo = await Todo.find({ ...filterQuery });
    if (queryTodo.length === 0) {
        return res
            .status(201)
            .send(messageHandler(true, { queries: queryTodo }, 201));
    }
    return res
        .status(201)
        .send(messageHandler(true, { queries: queryTodo }, 201));
});
