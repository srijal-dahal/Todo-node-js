const { Router } = require("express");
const todoController = require("../controller/todo_controller");

const router = Router();

router.post("/create/user=:userId/", todoController.createTodo);
router.delete("/delete/:todoid", todoController.deleteTodo);
router.get("/getTodos/user=:userId", todoController.getTodos);
router.put("/update/:todoId", todoController.updateTodo);
router.get("/getTodos/query", todoController.queryTodo);

module.exports = router;
