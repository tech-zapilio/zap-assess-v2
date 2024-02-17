import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../App/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../Store/action-types";
import { useEffect, useState } from "react";
import QuestionContainer from "./components/QuestionContainer";
import Navigation from "./components/Navigation";
const card_styles = {
  boxShadow:
    "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
  borderRadius: 5,
  padding: 3,
  backgroundColor: "#fff",
};

const ScreeningQuestions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { applicant } = useAppSelector(
    (state) => state.assessment_app.verifyCandidateResponse
  );
  const { screeningQuestions } = useAppSelector(
    (state) => state.assessment_app
  );

  const numberOfQ = applicant.job.screeningQ.length;
  const [currentQ, setCurrentQ] = useState(0);
  useEffect(() => {
    dispatch({
      type: ActionType.CLEAR_PREV_ASSESSMENT,
    });
  }, []);
  function handleStartAssessment() {
    dispatch({
      type: ActionType.CLEAR_PREV_ASSESSMENT,
    });
    dispatch({
      type: ActionType.START_ASSESSMENT,
      payload: {
        userAssessmentId: "",
        assessmentLib: {
          questions: applicant.assessment.totalQuestions,
          duration: applicant.assessment.totalTime,
          name: applicant.assessment.name,
        },
      },
    });
    navigate("/assessment-app");
  }
  const { currentQNumber } = screeningQuestions;

  const { screeningQ } = applicant.job;


  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Stack
            sx={{ height: "100vh", backgroundColor: "#eaecf0" }}
            justifyContent="center"
          >
            <Container maxWidth="sm">
              <Stack spacing={4}>
                <Stack>
                  <Typography variant="s18w6c700">
                    Screening Questions
                  </Typography>
                  <Typography variant="s12w4c500" color="text.800">
                    {" "}
                    {screeningQ.length} Questions |{" "}
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {/* {applicant.assessment.instructions.map((ins, index) => ( */}
                  <Stack sx={card_styles} spacing={1}>
                    <Grid>
                      <Grid
                        p={{ xs: 2, md: 5 }}
                        //   sx={question_container_styles}
                      >
                        <Container maxWidth="md">
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
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScreeningQuestions;
