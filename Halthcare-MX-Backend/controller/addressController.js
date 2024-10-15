const address = require("../modal/addressModal");

exports.addressController = async (req, res) => {
  try {
    const addresssdata = await address.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        addresssdata,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: res.status,
      message: error.message,
    });
  }
};
