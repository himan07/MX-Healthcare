import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import FileUploader from "../../../components/FileUploader/FileUploader";
import "../../../assets/styles/authLayout.css";
import { useSignIn } from "@clerk/clerk-react";

const ProfessionalDetails = ({ setActiveStep }) => {
  const email = sessionStorage.getItem("userEmail");
  const password = localStorage.getItem('password')
  const { signIn, isLoaded, setActive } = useSignIn();

  const [medicalLicense, setMedicalLicense] = useState("");
  const [personalId, setPersonalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState({
    medicalLicense: false,
    personalID: false,
  });

  const handleMedicalLicenseUpload = (file) => {
    setFileUploaded((prev) => ({ ...prev, medicalLicense: true }));
    setMedicalLicense(file);
  };

  const handlePersonalIDUpload = (file) => {
    setFileUploaded((prev) => ({ ...prev, personalID: true }));
    setPersonalId(file);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("medicalLicense", medicalLicense);
    if (personalId) {
      formData.append("personalId", personalId);
    }
    formData.append("email", email);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/uploadImage",
        formData
      );

      if (response.status === 201) {
        const result = await signIn?.create({
          identifier: email,
          password,
        });
        if (result?.status === "complete" && result.createdSessionId) {
          await setActive?.({ session: result.createdSessionId });
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "100%", margin: "auto" }}>
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

        <Box sx={{ mt: 4 }}>
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
              },
            }}
            onClick={handleSave}
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfessionalDetails;
