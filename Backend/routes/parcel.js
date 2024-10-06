const express = require("express");
const { createParcel, getAllParcels, updateParcel, getOneParcel, getUserParcel, deleteParcel } = require("../controllers/parcel");
const router = express.Router();


//Add parcel
router.post("/", createParcel)

//Get all parcels
router.get("/", getAllParcels)


//Update parcel
router.put("/:id", updateParcel)

//Get ome parcel

router.get("/find/:id", getOneParcel)

//Get users parcels

router.post("/me", getUserParcel)

//Delete parcel

router.delete("/:id", deleteParcel)

module.exports = router;