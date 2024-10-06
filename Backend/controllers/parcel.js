const Parcel = require("../models/Parcel");

//Create a parcel

const createParcel = async (req, res) => {
  try {
    const newparcel = Parcel(req.body);
    const parcel = await newparcel.save();
    res.status(201).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get all parcels

const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().sort({ createdAt: -1 });
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update the parcel

const updateParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    restart.status(201).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get one parcel
const getOneParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    res.status(200).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get user parcel

const getUserParcel = async (req, res) => {
  try {
    const parcels = await Parcel.find({ senderphone: req.bodey.phone }).sort({
      createdAt: -1,
    });
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete a parcel

const deleteParcel = async (req, res) => {
  try {
    await Parcel.findByIdAndDelete(req.params.id);
    res.status(201).json("Parcel has been deleted succefully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  deleteParcel,
  getUserParcel,
  getOneParcel,
  updateParcel,
  getAllParcels,
  createParcel,
};
