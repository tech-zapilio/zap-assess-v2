import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import congratsAnimation from "./animations/congrats.json";
import { useLottie } from "lottie-react";
import { useNavigate } from "react-router-dom";
import screenfull from "screenfull";
import { useAppSelector } from "../../../App/hooks";
import CompleteIcon from "../../../Assets/SVGs/Group 15698.svg";

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
        {/* <Stack width={300}>{View}</Stack> */}
        <Stack spacing={5} alignItems="center" textAlign="center">
          {/* <Typography
            variant={isSmallScreen ? "s20w6c600" : "s18w6c700"}
            color="#fff"
          >
            Congratulations
          </Typography> */}
          <img src={CompleteIcon}></img>
          <Typography
            variant={isSmallScreen ? "s20w6c600" : "s18w6c700"}
            color="#F6FEF9"
            width={"20vw"}
          >
            You have successfully finished the assessment
          </Typography>
          <Stack
            gap={3}
            alignItems="center"
            justifyContent="space-between"
            // height="100vh"
            direction={"row"}
          >
            {verifyCandidateResponse.applicant.job.bDisplayReport && (
              <Button onClick={() => navigate("/report")} variant="outlined">
                View Graphical Report
              </Button>
            )}
            {/* <Button onClick={() => navigate("/")} variant="outlined">
              Go Home
            </Button> */}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Completed;
