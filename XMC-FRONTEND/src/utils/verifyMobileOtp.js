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

  try {
    const queryParams = new URLSearchParams({
      username: VERIFY_CONFIG.username,
      password: VERIFY_CONFIG.password,
      msisdn: String(phoneNumber),
      otp: otpCode
    }).toString();
    
    const response = await axios.get(`/api/OtpApi/checkotp?${queryParams}`);
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
