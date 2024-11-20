const CreateUser = require("../models/createuser.model");

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.headers.emailid;
    console.log("email: ", email)

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email ID is required in headers" });
    }

    const user = await CreateUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error: error.message });
  }
};
