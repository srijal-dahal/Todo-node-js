const { Router } = require("express");
const todoController = require("../controller/todo_controller");

const router = Router();

router.post("/create/user=:userId/", todoController.createTodo);
router.delete("/delete/:todoId", todoController.deleteTodo);
router.get("/getTodos/user=:userId", todoController.getTodos);
router.put("/update/:todoId", todoController.updateTodo);
router.get("/completed-todos/user=:userId", todoController.getCompletedTodos);
module.exports = router;
