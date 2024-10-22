const PersonalDetail = require("../modal/PersonalDetails");
const { v4: uuidv4 } = require("uuid");

exports.createPersonalDetails = async (req, res) => {
  try {
    const uuid = uuidv4();
    const personalDetailsData = {
      ...req.body,
      uuid, 
    };
    const personalDetails = await PersonalDetail.create(personalDetailsData);
    res.status(201).json({
      status: "success",
      data: {
        personalDetails,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: res.status,
      message: error.message,
    });
  }
};
