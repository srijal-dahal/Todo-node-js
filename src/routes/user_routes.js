const { Router } = require("express");
const userController = require("../controller/user_controller");
const router = Router();

router.post("/update-user/:userId", userController.updateUser);
router.delete("/delete-user/:userId", userController.deleteUser);
router.get("/get-user/:userId", userController.getUser);
router.get("/get-users", userController.getUsers);

module.exports = router;
