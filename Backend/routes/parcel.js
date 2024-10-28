const express = require("express");
const {
  createParcel,
  getAllParcels,
  updateParcel,
  getOneParcel,
  getUserParcel,
  deleteParcel,
} = require("../controllers/parcel");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const router = express.Router();
const Parcel = require("../models/Parcel");
//Add parcel
router.post("/", createParcel);

//Get all parcels
router.get("/", getAllParcels);

//Update parcel
router.put("/:id", async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get one parcel

router.get("/find/:id", getOneParcel);

//Get users parcels

router.post("/me", getUserParcel);

//Delete parcel

router.delete("/:id", deleteParcel);

module.exports = router;
