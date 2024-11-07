const createUser = require("../modal/CreateUserModal");

exports.CreateUser = async (req, res) => {
  try {
    const emailExists = await createUser.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    let uuid;

    if (!emailExists) {
      const generateNumericUUID = () => {
        return Math.floor(10000 + Math.random() * 90000);
      };

      const randomId = generateNumericUUID();
      uuid = `MXD${randomId}`;
    }

    const createUserData = {
      ...req.body,
      uuid,
    };

    const Users = await createUser.create(createUserData);
    res.status(201).json({
      status: "success",
      data: {
        Users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
