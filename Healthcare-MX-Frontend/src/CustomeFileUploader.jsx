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

const CustomeFileUploader = () => {
  const [file, setFile] = useState(null); 
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      alert("File uploaded successfully!");
      setFile(null); 
      setUploading(false);
    }, 1000);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 2 }}>
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
                <Button
                  color="secondary"
                  onClick={() => setFile(null)} 
                >
                  Remove
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || uploading}
            sx={{ width: "60%", backgroundColor: "#1359a0" }}
            size="medium"
          >
            {uploading ? <CircularProgress size={24} /> : "Upload"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CustomeFileUploader;
