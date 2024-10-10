const ProfessionalDetails = require("../modal/ProfessionalDetails");

exports.createProfessionalDetails = async (req, res) => {
  try {
    const professionalDetails = await ProfessionalDetails.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        professionalDetails,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: res.status,
      message: error.message,
    });
  }
};
