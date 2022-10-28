const express = require("express");

const userController = require("../controllers/userController");
const checkToken = require("../middleware/checkToken");

// const authUser = require("../middleware/authUser");

const router = express.Router();

// router.post("/create", authUser.protect, userController.createUser);
router.post("/login", userController.login);
router.route('/register').post(userController.register);
router.route('/secret').get(checkToken, userController.secret)
// router.post("/updatePassword", authUser.protect, userController.updatePassword)
// router.get("/", authUser.protect, userController.getAllUsers);
// router.get("/:id", authUser.protect, userController.getUserById);
// router.get("/project/:id", authUser.protect, userController.getUserProject);
module.exports = router;
