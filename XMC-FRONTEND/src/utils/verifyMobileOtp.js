import axios from 'axios';

export const verifyMobileOtp = async (phoneNumber, otpCode) => {
  if (!phoneNumber || !otpCode) {
    console.error("Phone number and OTP code are required.");
    return false;
  }

  const VERIFY_CONFIG = {
    username: "Xcelotp",
    password: "!P3Bg*1s",
    
  };

  const params = {
    ...VERIFY_CONFIG,
    msisdn: String(phoneNumber),
    otp: otpCode,
  };

  try {
    const response = await axios.post('/apiOtpApi/checkotp?', params);
    if (response.status === 200) {
      return true;
    } else {
      console.error(`Verification failed. Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message || error);
    return false;
  }
};
