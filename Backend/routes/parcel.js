const express = require("express");
const { createParcel, getAllParcels, updateParcel, getOneParcel, getUserParcel, deleteParcel } = require("../controllers/parcel");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const router = express.Router();


//Add parcel
router.post("/", verifyToken, createParcel)

//Get all parcels
router.get("/", verifyTokenAndAuthorization, getAllParcels)


//Update parcel
router.put("/:id", updateParcel)

//Get ome parcel

router.get("/find/:id", getOneParcel)

//Get users parcels

router.post("/me", getUserParcel)

//Delete parcel

router.delete("/:id", deleteParcel)

module.exports = router;