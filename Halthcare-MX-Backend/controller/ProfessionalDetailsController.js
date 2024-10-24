const ProfessionalDetails = require("../modal/ProfessionalDetails");
const PersonalDetail = require("../modal/PersonalDetails");

exports.createProfessionalDetails = async (req, res) => {
  try {
    const personalDetail = await PersonalDetail.findOne();

    const professionalDetailsSchema = {
      ...req.body,
      uuid: personalDetail.uuid,
      uniqueId: personalDetail.uniqueId,
    };

    const professionalDetails = await ProfessionalDetails.create(
      professionalDetailsSchema
    );
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
