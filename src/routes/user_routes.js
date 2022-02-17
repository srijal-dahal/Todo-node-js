const { Router } = require("express");
const userController = require("../controller/user_controller");
const router = Router();

router.post("/update-user/:todoid", userController.updateUser);
router.delete("/delete-user/:todoid", userController.deleteUser);
router.get("/get-user/:todoid", userController.getUser);
router.get("/get-users", userController.getUsers);

module.exports = router;
