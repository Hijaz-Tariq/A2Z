const User = require("../models/User");

//Deleting User

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params, id);
    res.status(201).json("the User has been deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find.sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllUsers, deleteUser };
