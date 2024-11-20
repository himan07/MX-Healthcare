const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const uploadCertificateRouter = require("./src/routes/uploadcert.routes");
const getUser = require("./src/routes/getUser.routes")
const personalInfo = require("./src/routes/createPersonalnfo.routes")

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from middleware...");
  next();
});

app.use("/api/uploadImage", uploadCertificateRouter);
app.use('/getUsers', getUser)
app.use('/create-personalInfo', personalInfo)

module.exports = app;
