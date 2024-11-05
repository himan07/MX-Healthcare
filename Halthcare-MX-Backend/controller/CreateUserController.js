const createUser = require("../modal/CreateUserModal");

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

      const country = req.body.country || "XX";
      const countryCode = countryCodes[country] || "XX";
      const randomId = generateNumericUUID();
      uuid = `MXD${countryCode}${randomId}`;
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
