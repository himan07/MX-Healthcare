import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import currencyIcon from "../../../assets/images/CurrencyCircleDollar.svg";
import Sealcheck from "../../../assets/images/SealCheck.svg"

const DashboardCard = ({ balance, studiesCompleted }) => (
  <Grid container spacing={2} sx={{ marginBottom: 2 }}>
    <Grid item xs={12} md={6}>
      <Card
        sx={{border: "1px solid e0e0e0", borderRadius: 2, pt:0.5 }}
      >
        <CardContent sx={{display:"flex", justifyContent:"space-between"}}>
          <Box sx={{mt:1}}>
            <Typography variant="h4">{balance}</Typography>
            <Typography variant="body1">Current Balance</Typography>
          </Box>
          <img src={currencyIcon} alt="icon is not found" />
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} md={6}>
      <Card
        sx={{ boxShadow: 0.5, border: "1px solid e0e0e0", borderRadius: 2 ,pt:0.5}}
      >
        <CardContent sx={{display:"flex", justifyContent:"space-between"}}>
       <Box sx={{mt:1}}>
       <Typography
            variant="h4"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {studiesCompleted}
          </Typography>
          <Typography variant="body1">Studies Completed</Typography>
       </Box>

            <img src={Sealcheck} alt="icon is not found" />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default DashboardCard;
