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
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const IdentityPage = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const filteredFiles = acceptedFiles.filter((file) => {
      if (files.find((f) => f.name === file.name)) {
        alert(`File ${file.name} is already added!`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`File ${file.name} exceeds the 5MB limit.`);
        return false;
      }
      return true;
    });
    setFiles((prev) => [...prev, ...filteredFiles]);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      alert("Files uploaded successfully!");

      setFiles([]);
      setUploading(false);
      navigate("/address");
    }, 1000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: uploading,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif", ".bmp"],
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        height: "calc(100vh - 210px)",
      }}
    >
      <Paper elevation={2} sx={{ p: 4, mb: 0, mt: 4 }}>
        <Typography variant="h6" align="left" gutterBottom>
          Upload Your Identity
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #1359a0",
            p: 6,
            mb: 4,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: isDragActive ? "#f0f0f0" : "transparent",
            pointerEvents: uploading ? "none" : "auto",
          }}
        >
          <input {...getInputProps()} />
          <Typography>
            {isDragActive
              ? "Drop files here..."
              : "Drag & drop files here, or click to select files"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Only images (jpeg, png, jpg, gif, bmp) and PDFs are allowed. Max
            size: 5MB
          </Typography>
        </Box>
        {files.length > 0 && (
          <Grid container spacing={1} sx={{ mt: 2 }}>
            {files.map((file) => (
              <Grid item xs={12} key={file.name}>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography noWrap>{file.name}</Typography>
                  <Button
                    color="secondary"
                    onClick={() =>
                      setFiles((prev) => prev.filter((f) => f !== file))
                    }
                  >
                    Remove
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
          sx={{ mt: 2, mb: 4, width: "100%", backgroundColor: "#1359a0" }}
          size="large"
        >
          {uploading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </Paper>
    </Box>
  );
};

export default IdentityPage;
