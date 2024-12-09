import axios from "axios";

const OTP_CONFIG = {
  username: "Xcelotp",
  password: "!P3Bg*1s",
  source: "XLSRVY",
  otplen: "6",
  exptime: "600",
  entityid: "1601100000000017697",
  tempid: "1607100000000233745",
};

const handleOtpSend = async (phoneNumber) => {
  let messageText =
    "Dear User,Your OTP for Token App is %m. This is valid for 10 min, please do not share it with anyone.Team Market-Xcel";
  if (!phoneNumber) {
    console.error("Phone number is required");
    return false;
  }

  const params = {
    ...OTP_CONFIG,
    msisdn: phoneNumber,
    msg: messageText,
  };

  const queryString = new URLSearchParams(params).toString();

  try {
    const response = await axios.get(`/api/OtpApi/otpgenerate?${queryString}`);
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to send OTP");
      return false;
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message || error);
    return false;
  }
};

const handleRegister = async (
  formData,
  setLoading,
  setActiveStep,
  isLoaded,
  navigate,
  signUp
) => {
  if (!isLoaded) return;

  setLoading(true);

  try {
    const phoneNumber = formData.msDn;
    const user = await signUp.create({
      emailAddress: formData.email,
      password: formData.password,
    });


    await signUp.prepareEmailAddressVerification(user.email);

    const otpSent = await handleOtpSend(phoneNumber);

    if (otpSent) {
      sessionStorage.setItem("userEmail", user.emailAddress);
      setActiveStep((prevStep) => prevStep + 1);
      navigate("/register/verification");
    }
  } catch (error) {
    console.error("Error during registration:", error.message || error);
  } finally {
    setLoading(false);
  }
};

export { handleOtpSend, handleRegister };
