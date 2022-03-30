const { Router } = require("express");
const todoController = require("../controller/todo_controller");
const {allowIfLogin} = require("../middleware/allowIfLogin");
const router = Router();

router.post("/create/user=:userId", allowIfLogin, todoController.createTodo);
router.delete(
  "/delete/:todoId/user=:userId",
  allowIfLogin,
  todoController.deleteTodo
);
router.get("/getTodos/user=:userId", allowIfLogin, todoController.getTodos);
router.put(
  "/update/:todoId/user=:userId",
  allowIfLogin,
  todoController.updateTodo
);
router.get(
  "/completed-todos/user=:userId",
  allowIfLogin,
  todoController.getCompletedTodos
);
module.exports = router;
