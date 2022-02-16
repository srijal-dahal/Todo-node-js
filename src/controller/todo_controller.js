const asyncHandler = require("../middleware/asyncHandler");
const messageHandler = require("../utils/messageHandler");
const factory = require("../middleware/factoryHandler");
const { Todo } = require("../models/ToDo");

module.exports.createTodo = factory.createOne(Todo);

module.exports.updateTodo = factory.updateOne(Todo);

module.exports.deleteTodo = factory.deleteOne(Todo);

module.exports.getTodos = factory.getAll(Todo);


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
    return res.status(201).send(messageHandler( true, {queries:queryTodo}, 201));
  }
  return res.status(201).send(messageHandler( true, {queries:queryTodo}, 201));
});
