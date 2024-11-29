import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileUploader from "../../../components/FileUploader/FileUploader";
import "../../../assets/styles/authLayout.css"

const ProfessionalDetails = ({ setActiveStep }) => {
  const navigate = useNavigate();

  const [fileUploaded, setFileUploaded] = useState({
    medicalLicense: false,
    personalID: false,
  });

  const handleMedicalLicenseUpload = (file) => {
    setFileUploaded((prev) => ({ ...prev, medicalLicense: true }));
    console.log("Medical License uploaded:", file.name);
  };

  const handlePersonalIDUpload = (file) => {
    setFileUploaded((prev) => ({ ...prev, personalID: true }));
    console.log("Personal ID uploaded:", file.name);
  };


  const handleSave = () => {
    setActiveStep((prevStep) => prevStep + 1);
    localStorage.clear("activeStep");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 260px)",
        margin: "20px auto",
        padding: "20px",
        maxWidth: "100%",
        boxSizing: "border-box"
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          margin: "auto"
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          Upload your medical license/certificate
        </Typography>
        <FileUploader
          label="Drop files here to upload your medical license..."
          onFileUpload={handleMedicalLicenseUpload}
        />

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          Upload your personal ID (Optional)
        </Typography>
        <FileUploader
          label="Drop files here to upload your personal ID..."
          onFileUpload={handlePersonalIDUpload}
        />

        <Typography
          sx={{
            color: "#777",
            fontSize: "14px",
            marginBottom: "20px",
            lineHeight: "1.5",
          }}
        >
          This is an optional step. If you prefer to not upload your personal
          ID, our representative will reach out to you for verification.
        </Typography>

        <Box sx={{ 
          mt: 4,
        }}>
          <Button
            variant="contained"
            size="lg"
            fullWidth
            disabled={!fileUploaded.medicalLicense}
            sx={{
              backgroundColor: "rgba(46, 104, 174, 1)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(46, 104, 174, 0.9)",
              },
              "&:disabled": {
                backgroundColor: "rgba(0, 0, 0, 0.12)",
                color: "rgba(0, 0, 0, 0.26)",
              }
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfessionalDetails;
