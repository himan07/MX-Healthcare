import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Paper,
  Popper,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import countries from "../../../../dev-data/CountyData.json";

const StyledPopper = styled(Popper)({
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  marginTop: "8px",
  zIndex: 1000,
  fontSize: "16px",
});

const StyledPaper = styled(Paper)({
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  fontSize: "16px",
});

const AddressPage = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");  

  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const countyRef = useRef(null);
  const zipcodeRef = useRef(null);

  const handleKeyDown = (e, currentRef, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef) {
        nextRef.current.focus();
      } else {
        onSubmit();
        currentRef.current.form.submit();
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isMobile = useMediaQuery("(max-width:600px)");

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  const handleCountryChange = (event, value) => {
    setCountry(value);
  };

  const handleStateChange = (event, value) => {
    setState(value);
  };

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        px: isMobile ? 2 : 4,
        py: 2,
        borderRadius: "8px",
        maxWidth: isMobile ? "100%" : "90%",
        mx: "auto",
        height: "calc(100vh - 220px)",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              inputRef={addressRef}
              label="Address"
              {...register("address", {
                required: "Address is required",
              })}
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ""}
              sx={{ mb: 2 }}
              onKeyDown={(e) => handleKeyDown(e, addressRef, cityRef)}
            />

            <TextField
              variant="outlined"
              fullWidth
              inputRef={cityRef}
              label="City"
              {...register("city", {
                required: "City is required",
              })}
              error={!!errors.city}
              helperText={errors.city ? errors.city.message : ""}
              sx={{ mb: 2 }}
              onKeyDown={(e) => handleKeyDown(e, cityRef, stateRef)}
            />

            <Autocomplete
              fullWidth
              disablePortal={false}
              PopperComponent={(props) => <StyledPopper {...props} />}
              PaperComponent={(props) => <StyledPaper {...props} />}
              options={countries.map((item) => item.country)}
              getOptionLabel={(option) => option || ""}
              onChange={handleStateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={stateRef}
                  label="State"
                  variant="outlined"
                  error={!!errors.state}
                  helperText={errors.state ? errors.state.message : ""}
                  onKeyDown={(e) => handleKeyDown(e, stateRef, countyRef)}
                />
              )}
              sx={{ mb: 2 }}
            />

            <Autocomplete
              fullWidth
              disablePortal={false}
              PopperComponent={(props) => <StyledPopper {...props} />}
              PaperComponent={(props) => <StyledPaper {...props} />}
              options={countries.map((item) => item.country)}
              getOptionLabel={(option) => option || ""}
              onChange={handleCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  error={!!errors.country}
                  helperText={errors.country ? errors.country.message : ""}
                  inputRef={countyRef}
                  onKeyDown={(e) => handleKeyDown(e, countyRef, zipcodeRef)}
                />
              )}
              sx={{ mb: 2 }}
            />

            <TextField
              variant="outlined"
              fullWidth
              label="Zip Code / Postal Code"
              {...register("zip", {
                required: "Zip Code is required",
              })}
              error={!!errors.zip}
              helperText={errors.zip ? errors.zip.message : ""}
              sx={{ mb: 2 }}
              inputRef={zipcodeRef}
              onKeyDown={(e) => handleKeyDown(e, zipcodeRef, null)}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "right", gap: 2 }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#1359a0",
              mt: 3,
              height: "45px",
              px: 5,
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddressPage;