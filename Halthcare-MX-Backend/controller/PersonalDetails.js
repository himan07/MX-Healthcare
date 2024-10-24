const PersonalDetail = require("../modal/PersonalDetails");
const { v4: uuidv4 } = require("uuid");

const countryCodes = {
  "United States": "US",
  Germany: "DE",
  Switzerland: "CH",
  Singapore: "SG",
  Japan: "JP",
  "United Kingdom": "GB",
  France: "FR",
  Canada: "CA",
  "South Korea": "KR",
  India: "IN",
  China: "CN",
  Israel: "IL",
  Australia: "AU",
  Netherlands: "NL",
  Sweden: "SE",
  Italy: "IT",
  Belgium: "BE",
  Brazil: "BR",
  Thailand: "TH",
  Mexico: "MX",
};

exports.createPersonalDetails = async (req, res) => {
  try {
    const emailExists = await PersonalDetail.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    if (!emailExists) {
      const generateNumericUUID = () => {
        return Math.floor(10000 + Math.random() * 90000);
      };

      const country = req.body.country || "XX";
      const countryCode = countryCodes[country] || "XX";
      const randomId = generateNumericUUID();
      const uuid = `MXD${countryCode}${uuidv4()}`;
      const uniqueId = `MXD${countryCode}${randomId}`;

      const personalDetailsData = {
        ...req.body,
        uuid,
        uniqueId,
      };

      const personalDetails = await PersonalDetail.create(personalDetailsData);
      res.status(201).json({
        status: "success",
        data: {
          personalDetails,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
