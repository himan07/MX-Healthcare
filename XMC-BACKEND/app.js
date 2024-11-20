const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const ImageRouter = require("./routes/uploadImage");
const CreateUser = require("./routes/CreateUserRoutes")
const getUser = require("./routes/getUser.routes")

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from middleware...");
  next();
});

app.use("/api/createUser", CreateUser);
app.use("/api/uploadImage", ImageRouter);
app.use('/getUsers', getUser)

module.exports = app;
