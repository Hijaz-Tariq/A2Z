const express = require("express");
const { deleteUser, getAllUsers } = require("../controllers/user");
const router = express.Router();

//Deleting User

router.delete("/:id", deleteUser);

// Get all users

router.get("/", getAllUsers);

module.exports = router;
