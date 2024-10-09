import * as React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Logo from "../../assets/images/XGP.png"

const TopbarLayout = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}> 
      <AppBar position="sticky" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
        <Toolbar>
          {/* <Typography variant="h6" color="black" component="div" sx={{ flexGrow: 1 }}>
            Market-Xcel XGP
          </Typography> */}
          <img src={Logo} style={{height:"70px", padding:"10px 0px 10px 0px" }}/>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopbarLayout;
