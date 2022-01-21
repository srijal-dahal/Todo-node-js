const asyncHandler = require("../middleware/asyncHandler");
const messageHandler = require("../utils/messageHandler");

const { Todo } = require("../models/ToDo");

module.exports.createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create({
    name: req.body.name,
    description: req.body.description,
  });
  return res.status(201).send(messageHandler(true, { todos: todo }, 201));
});
module.exports.updateTodo = asyncHandler(async (req, res) => {
  const updatingValue = req.body;
  const todoId = req.params.todoid;
  console.log(todoId);
  await Todo.findByIdAndUpdate(todoId, updatingValue);
  return res
    .status(201)
    .send(messageHandler(true, "Todo successfully updated", 201));
});
module.exports.deleteTodo = asyncHandler(async (req, res) => {
  const todoId = req.params.todoid;
  await Todo.findByIdAndDelete(todoId);
  return res
    .status(201)
    .send(messageHandler(true, "Todo successfully deleted", 201));
});

module.exports.getTodos = asyncHandler(async (req, res) => {
  const todo = await Todo.find({});
  return res.status(201).send(messageHandler(true, { todos: todo }, 201));
});
module.exports.queryTodo = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const filterQuery = name
    ? {
        name: { $regex: name, $options: "i" },
      }
    : {};
  const queryTodo = await Todo.find({ ...filterQuery });
  if (filterQuery === {}) {
    return res
      .status(201)
      .send(messageHandler(true, { queries: filterQuery }, 201));
  }

  return res
    .status(201)
    .send(messageHandler(true, { queries: queryTodo }, 201));
});
