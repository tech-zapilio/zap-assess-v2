import { useAppSelector } from "../../../../../App/hooks";
import { Grid } from "@mui/material";
import MultiChoice from "./MultiChoice";
import Rank from "./Rank";
import Switch from "./Switch";

const QuestionType = () => {
  const { currentQuestion } = useAppSelector((state) => state.assessment_app);
  const questionType = currentQuestion.question.questionType;
  return (
    <Grid>
      {
        {
          pickOne: <MultiChoice />,
          pickMulti: <MultiChoice />,
          rank: <Rank />,
          switch: <Switch />,
        }[questionType]
      }
    </Grid>
  );
};

export default QuestionType;
