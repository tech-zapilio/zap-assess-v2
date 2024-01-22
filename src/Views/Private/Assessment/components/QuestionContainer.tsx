import { CircularProgress, Grid, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../../../App/hooks";
import QuestionType from "./question-types/QuestionType";

type QuestionType = "pickOne" | "pickMulti" | "rank" | "switch" | "slider" | "pickOneImage" | "text";

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
  const { currentQuestion } = useAppSelector((state) => state.assessment_app);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Stack spacing={1}>
      <Typography sx={{ textTransform: "uppercase" }} variant="s16w6c700" color="primary">
        {currentQuestion.question.competency}
      </Typography>
      <Stack mb={1} direction={{ xs: "column", md: "row" }} alignItems="baseline" spacing={1}>
        {!isSmallScreen && (
          <Typography variant="s28w6c800" color="primary">
            Q{currentQuestion.index}.
          </Typography>
        )}
        <Stack width="100%">
          <Typography variant={isSmallScreen ? "s20w6c600" : "s28w6c800"}>
            {isSmallScreen && (
              <Typography variant={isSmallScreen ? "s20w6c600" : "s28w6c800"} color="primary">
                Q{currentQuestion.index}.&nbsp;
              </Typography>
            )}

            {currentQuestion.question.question}
          </Typography>
          <Typography variant="s14w5c400" fontWeight={500}>
            {questionHints[currentQuestion.question.questionType as QuestionType]}
          </Typography>
          <QuestionType />
        </Stack>
      </Stack>
    </Stack>
  );
};

const QuestionContainer = () => {
  const { questionLoading } = useAppSelector((state) => state.assessment_app);

  return (
    <Grid>
      {questionLoading ? (
        <Stack height={500} alignItems="center" justifyContent="center">
          {/*
          Skeleton Loading for Question
           <Skeleton variant="text" sx={{ fontSize: 16 }} width={100} />
          <Stack direction="row" spacing={1}>
            <Skeleton variant="text" width={20} sx={{ fontSize: 28 }} />
            <Skeleton variant="text" sx={{ flexGrow: 1, fontSize: 28 }} />
          </Stack>
          <Skeleton variant="text" sx={{ fontSize: 14 }} />
          <Stack spacing={1} mt={3}>
            <Skeleton variant="rectangular" sx={{ borderRadius: 3.5 }} height={60} />
            <Skeleton variant="rectangular" sx={{ borderRadius: 3.5 }} height={60} />
            <Skeleton variant="rectangular" sx={{ borderRadius: 3.5 }} height={60} />
            <Skeleton variant="rectangular" sx={{ borderRadius: 3.5 }} height={60} />
          </Stack> 
          */}
          <CircularProgress size={200} />
        </Stack>
      ) : (
        <Grid sx={{ minHeight: 500 }}>
          <QuestionDetails />
        </Grid>
      )}
    </Grid>
  );
};

export default QuestionContainer;
