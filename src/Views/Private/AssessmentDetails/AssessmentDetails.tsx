import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../App/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../Store/action-types";

const card_styles = {
  boxShadow:
    "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
  borderRadius: 5,
  padding: 3,
  backgroundColor: "#fff",
};

const AssessmentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { applicant,customer } = useAppSelector(
    (state) => state.assessment_app.verifyCandidateResponse
  );

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

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Stack>
            <Container maxWidth="sm">
              <Stack
                sx={{ height: "100vh" }}
                justifyContent="center"
                spacing={4}>
                <Stack direction="row" alignItems="center"  spacing={1}>
                  <Stack height={30}>
                    <img
                      src={applicant.customer.logoURL}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </Stack>
                  {/* <Stack>
                    <Typography variant="s12w4c500"> Assessment By </Typography>
                    <Typography variant="s16w6c500">
                      {customer.registedName}
                    </Typography>
                  </Stack> */}
                </Stack>
                <Stack>
                  <Typography variant="s36w8c500" color="text.900">
                    {applicant.assessment?.name}
                  </Typography>
                  <Typography variant="s18w4c500" fontWeight={500}>
                    {applicant.job.assessmentLib.description}
                  </Typography>
                </Stack>
                <Stack>
                  <Button
                    onClick={handleStartAssessment}
                    size="large"
                    variant="contained">
                    Start Assessment
                  </Button>
                </Stack>
              </Stack>
            </Container>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            sx={{ height: "100vh", backgroundColor: "#eaecf0" }}
            justifyContent="center">
            <Container maxWidth="sm">
              <Stack spacing={4}>
                <Stack>
                  <Typography variant="s18w6c700">Test Instructions</Typography>
                  <Typography variant="s12w4c500" color="text.800">
                    {" "}
                    {applicant.assessment.totalQuestions} Questions |{" "}
                    {applicant.assessment.totalTime} Minutes
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {applicant.assessment.instructions.map((ins, index) => (
                    <Stack sx={card_styles} spacing={1} key={index}>
                      <Typography variant="s20w6c700">{ins.title}</Typography>
                      <Typography variant="s12w4c500">{ins.text}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Container>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssessmentDetails;
