const mongoose = require("mongoose");
const ParcelSchema = mongoose.Schema(
  {
    parcelTrack: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    rState: { type: String, require: true },
    sendername: { type: String, require: true },
    recipientname: { type: String, require: true },
    senderemail: { type: String, require: true },
    recipientemail: { type: String, require: true },
    senderphone: { type: String, require: true },
    recipientphone: { type: String, require: true },
    oilQuantity: { type: Number, require: true, default: 0 },
    oliveQuantity: { type: Number, require: true, default: 0 },
    cost: { type: Number, require: true },
    date: { type: String },
    note: { type: String },
    feedback: { type: String },
    paid: { type: Boolean, default: false },
    status: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parcel", ParcelSchema);
