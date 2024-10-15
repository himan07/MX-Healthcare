const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const personalRouter = require("./routes/PersonalDetails");
const professionalRouter = require("./routes/ProfessionalDetails");
const ImageRouter = require("./routes/uploadImage");
const IdentityDetails = require("./routes/IdentityDetails");
const addressRoutes = require("./routes/addressRoutes");

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from middleware...");
  next();
});

app.use("/api/personalDetails", personalRouter);
app.use("/api/professionalDetails", professionalRouter);
app.use("/api/uploadImage", ImageRouter);
app.use("/api/uploadIdentity", IdentityDetails);
app.use("/api/address", addressRoutes);

module.exports = app;
