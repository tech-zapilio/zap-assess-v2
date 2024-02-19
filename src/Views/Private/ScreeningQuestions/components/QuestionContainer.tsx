import {
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAppSelector } from "../../../../App/hooks";
import QuestionType from "./question-types/QuestionType";

type QuestionType =
  | "pickOne"
  | "pickMulti"
  | "rank"
  | "switch"
  | "slider"
  | "pickOneImage"
  | "text";

const questionHints = {
  pickOne: "Choose the most accurate option",
  pickMulti: "Select multiple options",
  rank: "Drag options to rearrange",
  switch: "Choose the most accurate option",
  slider: "Pick the correct value within the range",
  pickOneImage: "",
  text: "Type your answer",
};
const QuestionDetails = () => {
  // const { currentQuestion } = useAppSelector((state) => state.assessment_app);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { screeningQuestions, verifyCandidateResponse } = useAppSelector(
    (state) => state.assessment_app
  );
  const { currentQNumber } = screeningQuestions;
  const { screeningQ } = verifyCandidateResponse.applicant.job;
  const currentQuestion = screeningQ[currentQNumber];
  console.log("screeningQ", screeningQ);

  return (
    <Stack spacing={1}>
      {/* <Typography
        sx={{ textTransform: "uppercase" }}
        variant="s16w6c700"
        color="primary"
      >
        {currentQuestion.question.competency}
      </Typography> */}
      <Stack
        mb={1}
        direction={{ xs: "column", md: "row" }}
        alignItems="baseline"
        spacing={1}
      >
        {/* {!isSmallScreen && (
          <Typography variant="s28w6c800" color="primary">
            Q{currentQNumber + 1}.
          </Typography>
        )} */}
        <Stack width="100%">
          <Typography variant={isSmallScreen ? "s20w6c600" : "s28w6c800"}>
            {/* {isSmallScreen && (
              <Typography
                variant={isSmallScreen ? "s20w6c600" : "s28w6c800"}
                color="primary"
              >
                Q{currentQNumber + 1}.&nbsp;
              </Typography>
            )} */}

            {currentQuestion.question}
          </Typography>
          <Typography variant="s14w5c400" fontWeight={500}>
            {questionHints[currentQuestion.type as QuestionType]}
          </Typography>
          <QuestionType />
        </Stack>
      </Stack>
    </Stack>
  );
};

const QuestionContainer = () => {
  return (
      <Grid py={3} >
        <QuestionDetails />
      </Grid>
  );
};

export default QuestionContainer;
