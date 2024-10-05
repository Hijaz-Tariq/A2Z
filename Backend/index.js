const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");

dotenv.config();
const app = express();

//MIDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/authRoute", authRoute)

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
