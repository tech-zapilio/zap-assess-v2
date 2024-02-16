import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import congratsAnimation from "./animations/congrats.json";
import { useLottie } from "lottie-react";
import { useNavigate } from "react-router-dom";
import screenfull from "screenfull";
import { useAppSelector } from "../../../App/hooks";

const Completed = () => {
  const options = {
    animationData: congratsAnimation,
    loop: false,
  };

  const { View } = useLottie(options);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { verifyCandidateResponse } = useAppSelector(
    (state) => state.assessment_app
  );

  if (verifyCandidateResponse.applicant.job.isFullScreen) screenfull.exit();

  return (
    <Box height="100vh" maxWidth="100vw" sx={{ backgroundColor: "#3C5988" }}>
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <Stack width={300}>{View}</Stack>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography
            variant={isSmallScreen ? "s20w6c600" : "s18w6c700"}
            color="#fff"
          >
            Congratulations
          </Typography>
          <Typography
            variant={isSmallScreen ? "s20w6c600" : "s18w6c700"}
            color="#F6FEF9"
          >
            You have successfully finished the assessment
          </Typography>
          <Button onClick={() => navigate("/")} variant="outlined">
            Go Home
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Completed;
