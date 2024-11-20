export const dobValidation = (watch) => ({
    required: "Date of Birth is required",
    pattern: {
      value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/,
      message:watch("dateOfBirth") ? "Please enter a valid date in DD/MM/YYYY format" : "",
    },
    validate: (value) => {
      const dobParts = value.split("/");
      const dobDate = new Date(`${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`);
      const age = calculateAge(dobDate);
  
      if (age < 18) {
        return "You must be at least 18 years old";
      }
  
      return true; 
    },
  });
  
  const calculateAge = (dob) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth();
    if (month < dob.getMonth() || (month === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };
  