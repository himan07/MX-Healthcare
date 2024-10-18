import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const CustomeFileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setErr(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully!!");
      setUploadedFileName(file.name);
      setFile(null);
    } catch (error) {
      setErr(error);
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 2 }}>
      {uploadedFileName ? (
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: 0.5, color: "#1359a0" }}
          >
            Uploaded file: {uploadedFileName}
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ p: 1, px: 2, mb: 2 }}>
          <Typography variant="h6" align="left" sx={{ pb: 2 }} gutterBottom>
            Upload your medical certificate
          </Typography>

          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #1359a0",
              p: 2,
              mb: 2,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <Typography>Drag & drop a file here, or click to upload</Typography>
          </Box>

          {file && (
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{file.name}</Typography>
                  <Button color="secondary" onClick={() => setFile(null)}>
                    Remove
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}

          {err && (
            <Typography color="error" sx={{ mt: 2 }}>
              {err.response?.data?.message ===
              "Cannot read properties of null (reading 'medicalNo')"
                ? "The provided certificate number does not correspond to any personal details."
                : err.response?.data?.message}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!file || uploading}
              sx={{ width: "60%", backgroundColor: "#02003d" }}
              size="medium"
            >
              {uploading ? <CircularProgress size={24} /> : "Upload"}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default CustomeFileUploader;
