const express = require("express");

const router = express.Router();
const userController = require("../controller/user.js");
const auth = require("../auth.js");

router.post(
    "/register",
    userController.isEmailExisting,
    userController.registerUser
);

// route for authenticating user
router.post("/login", userController.loginUser);

// route for fetching user data
router.get("/details", auth.verifyToken, userController.fetchUserDetails);

// route for updating user information
router.put("/update-info", auth.verifyToken, userController.updateUserInfo);

// fetch users
router.get(
    "/fetch-users",
    auth.verifyToken,
    auth.verifyAdmin,
    userController.fetchUsers
);

module.exports = router;
