import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Modal,
  Fade,
  Backdrop,
  useMediaQuery,
} from "@mui/material";
import { useAppSelector } from "../../../App/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../Store/action-types";
import { useEffect, useState } from "react";
import QuestionContainer from "./components/QuestionContainer";
import Navigation from "./components/Navigation";
// import Timer from "../Assessment/components/Timer";
import Timer from "./components/Timer";
import TheatreExperience from "./components/TheatreExperience";
const card_styles = {
  boxShadow:
    "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
  borderRadius: 5,
  padding: 3,
  backgroundColor: "#fff",
  // opacity: 0.5,
};
const modalStyles = {
  position: "absolute",
  top: "50%",
  minHeight: 200,
  px: 6,
  width: { md: 700, xs: "70vw" },
  py: 4,
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  borderRadius: 7.5,
  zIndex: 1,
  // opacity: 0.9,
};

const ScreeningQuestions = () => {
  const { applicant } = useAppSelector(
    (state) => state.assessment_app.verifyCandidateResponse
  );
  const { openScreeningQuestionsModal } = useAppSelector(
    (state) => state.assessment_app
  );
  const { screeningQuestions } = useAppSelector(
    (state) => state.assessment_app
  );

  const { currentQNumber } = screeningQuestions;

  const { screeningQ } = applicant.job;
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Modal
      open={openScreeningQuestionsModal}
      slots={{ backdrop: Backdrop }}
      sx={{ background: "rgba(16, 24, 40, 0.6)" }}
    >
      <Fade in={openScreeningQuestionsModal}>
        <Box sx={modalStyles}>
          {/* <Box> */}
          <Grid container>
            <Grid item xs={12} md={12}>
              <Stack
                // sx={{ height: "50%", backgroundColor: "#eaecf0",position:"absolute" }}
                justifyContent="center"
              >
                {" "}
                <Grid px={{ xs: 2, md: 8 }} mt={4}>
                  <Grid container columnSpacing={6}>
                    {!isSmallScreen && (
                      <Grid item md={2}>
                        
                        <Stack alignItems="center">
                          <Stack px={8} pt={4} pb={2}>
                            {/* {endsOn && */}
                            <Timer />
                            {/* //  } */}
                          </Stack>

                          <Stack
                            mx={-7}
                            // width={"50%"}
                          >
                            <Typography variant="s12w4c500">
                              This timer has been paused for a quick challenge,
                              answer the following questions to continue the
                              assessment.
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    )}
                    <Grid item xs={12} md={10}>
                      <Container maxWidth="sm">
                        <Stack spacing={4}>
                          <Stack spacing={2}>
                            {/* {applicant.assessment.instructions.map((ins, index) => ( */}
                            <Stack sx={card_styles} spacing={1}>
                              <Grid>
                                <Grid
                                  p={{ xs: 2, md: 5 }}
                                  //   sx={question_container_styles}
                                >
                                  <Container maxWidth="md">
                                    <Stack>
                                      {/* <Typography variant="s18w6c700">
                              Screening Questions
                            </Typography> */}
                                      <Typography variant="s14w4c400">
                                        {" "}
                                        Questions {currentQNumber + 1} of{" "}
                                        {screeningQ.length}{" "}
                                      </Typography>
                                    </Stack>

                                    <Grid>
                                      <QuestionContainer />
                                      <Navigation />
                                    </Grid>
                                  </Container>
                                </Grid>
                              </Grid>
                            </Stack>
                            {/* ))} */}
                          </Stack>
                        </Stack>
                      </Container>
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ScreeningQuestions;
