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
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePhoneNumber = async (req, res) => {
  const { userId, phoneNumber } = req.body; // Extract userId and phoneNumber from request body

  try {
    // Find the user by ID and update the phone number
    const user = await User.findByIdAndUpdate(
      userId, 
      { phone: phoneNumber }, // Update the phone number field
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Phone number updated successfully',
      user // You can optionally return the updated user object
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });  // Correct query to search by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });  // Handle case where user is not found
    }
    res.status(200).json(user);  // Return the user data
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: 'Server error', error });  // Return error with message
  }
};


module.exports = { getAllUsers, deleteUser, updatePhoneNumber, getUser };
