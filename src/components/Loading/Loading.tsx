import React from "react";
import { Grid, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Grid height="70vh" container direction="column" alignItems="center" justifyContent="center">
      <CircularProgress size="200px" sx={{ opacity: "30%" }} />
    </Grid>
  );
};

export default Loading;
