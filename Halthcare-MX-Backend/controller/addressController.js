const address = require("../modal/addressModal");
const PersonalDetail = require("../modal/PersonalDetails");

exports.addressController = async (req, res) => {
  try {
    const personalDetail = await PersonalDetail.findOne();
    const addressSchema = {
      ...req.body,
      uuid: personalDetail.uuid,
      uniqueId:personalDetail.uniqueId
    };
    const addresssdata = await address.create(addressSchema);
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
