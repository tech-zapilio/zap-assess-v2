import { Grid, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../App/hooks";
import { QuestionIndex } from "../../../Types/assessment-app-types";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../Store/action-types";

const ReviewPage = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestion } = useAppSelector(
    (state) => state.assessment_app
  );

  const skipped_questions = questions.filter((q) => q.isSkipped);

  function load_question(q: QuestionIndex) {
    dispatch({ type: ActionType.LOAD_QUESTION_BY_INDEX, payload: q.index });
    dispatch({ type: ActionType.HIDE_REVIEW });
  }

  console.log(currentQuestion);
  return (
    <Grid sx={{ minHeight: 500 }}>
      <Typography>You have few UnAnswered questions</Typography>
      <Grid container spacing={1}>
        {skipped_questions.map((q) => (
          <Grid item>
            <Stack
              onClick={() => load_question(q)}
              textAlign="center"
              key={q.index}
              alignItems="center"
              justifyContent="center"
              sx={{
                cursor: "pointer",
                height: 100,
                width: 140,
                background: "#fff",
                borderRadius: 2.5,
                border: "1px solid #fff",
                boxShadow:
                  " 0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",

                p: 1,

                "&:hover": {
                  borderColor: "#fd5400",
                  background: "#FFEAD5",
                },
              }}
            >
              <Typography variant="s12w5c700">Q.{q.index}</Typography>
              <Typography
                sx={{ textTransform: "uppercase" }}
                variant="s12w8c500"
                color="primary"
              >
                {q.question.competency}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ReviewPage;
