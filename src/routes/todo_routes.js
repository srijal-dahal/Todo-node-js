const { Router } = require("express");

const {
  createTodo,
  deleteTodo,
  updateTodo,
  getTodos,
  queryTodo,
} = require("../controller/todo__controller");

const router = Router();

router.post("/create", createTodo);
router.delete("/delete/:todoid", deleteTodo);
router.get("/getTodos", getTodos);
router.put("/update/:todoid", updateTodo);
router.get("/getTodos/query", queryTodo);

module.exports = router;
