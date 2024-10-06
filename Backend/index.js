const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const parcelRoute = require("./routes/parcel");

dotenv.config();
const app = express();

//MIDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/authRoute", authRoute);
app.use("/users", userRoute);
app.use("/parcels", parcelRoute);

//SERVER
const PORT = process.env.PORT;
const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
