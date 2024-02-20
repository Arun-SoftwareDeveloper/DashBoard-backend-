const express = require("express");
const UserController = require("../Controllers/UserController");

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/forgotPassword", UserController.forgotPassword);
router.post("/resetPassword", UserController.resetPassword);
router.get("/usersList", UserController.getUsers);
router.put("/editUser/:id", UserController.editUser); // Route for editing a user
router.delete("/deleteUser/:id", UserController.deleteUser); // Route for deleting a user

module.exports = router;
