import { useAppSelector } from "../../../../../App/hooks";
import { Grid } from "@mui/material";
import MultiChoice from "./MultiChoice";
import Text from "./Text";

const QuestionType = () => {
  // const { currentQuestion } = useAppSelector((state) => state.assessment_app);
  const { screeningQuestions, verifyCandidateResponse } = useAppSelector(
    (state) => state.assessment_app
  );
  const { currentQNumber } = screeningQuestions;
  const { screeningQ } = verifyCandidateResponse.applicant.job;
  const currentQuestion = screeningQ[currentQNumber];

  const questionType = currentQuestion.type;
  return (
    <Grid>
      {
        {
          "multi choice": <MultiChoice />,
          text: <Text />,
          number: <Text />,

          
        }[questionType]
      }
    </Grid>
  );
};

export default QuestionType;
