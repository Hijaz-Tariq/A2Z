const express = require("express");
const { deleteUser, getAllUsers, updatePhoneNumber, getUser } = require("../controllers/user");
const router = express.Router();

//Deleting User

router.delete("/:id", deleteUser);

// Get all users

router.get("/", getAllUsers);

router.get("/find/:email", getUser);
// Define the route for updating the phone number
router.put('/update-phone', updatePhoneNumber);

module.exports = router;
