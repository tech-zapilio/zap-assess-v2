import { Circle } from "@mui/icons-material";
import { Grid, Typography, Stack, Tooltip, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { QuestionIndex } from "../../../../Types/assessment-app-types";
import { ActionType } from "../../../../Store/action-types";
import { useAppSelector } from "../../../../App/hooks";
import { useState } from "react";
import { submit_answer } from "../../../../API";
import { time_elapsed } from "../utils";
import { LoadingButton } from "@mui/lab";

const TheatreExperience = () => {
  const dispatch = useDispatch();
  const {
    questions,
    currentQuestion,
    questionLoading,
    drawerOpen,
    startedOn,
    userAssessmentId,
  } = useAppSelector((state) => state.assessment_app);

  function get_question_color(question: QuestionIndex) {
    const color = {
      color: "#98A2B3",
      background: "#fcfcfd",
    };

    const isCurrentQuestion = question.index === currentQuestion.index;

    if (isCurrentQuestion) {
      color.background = "#FFEAD5";
      color.color = "#FB6514";
      return color;
    }

    if (question.isAnswered) {
      color.background = "#ececec";
    }

    if (question.isAnswered || question.isSkipped) {
      color.color = "#475467";
      return color;
    }
  }

  function isLatest(question: QuestionIndex) {
    const isLatestQuestion =
      !question.isAnswered && !question.isSkipped && question.question?._id;
    return isLatestQuestion;
  }

  function loadQuestion(question: QuestionIndex) {
    //Close the drawer if it's opened
    if (drawerOpen) {
      dispatch({ type: ActionType.CLOSE_ASSESSMENT_DRAWER });
    }
    if (questionLoading) {
      return;
    }

    const isLatestQuestion = isLatest(question);

    if (question.isSkipped || isLatestQuestion) {
      //If current question is not answered update the status to skipped so the question can be revisited again
      if (!currentQuestion.isAnswered) {
        dispatch({
          type: ActionType.UPDATE_QUESTION_STATUS,
          payload: {
            index: currentQuestion.index,
            isAnswered: false,
            isSkipped: true,
          },
        });
      }

      dispatch({ type: ActionType.LOAD_QUESTION, payload: question });
    }
  }

  function show_submit_button() {
    const questionsLoaded = questions.filter(
      (q) => q.question?._id?.length > 0
    );
    return questionsLoaded.length === questions.length;
  }

  const [submitting, setIsSubmitting] = useState(false);
  async function handle_submit() {
    try {
      setIsSubmitting(true);
      const data = await submit_answer({
        userAssessmentId: userAssessmentId,
        question: currentQuestion.question._id,
        isComplete: true,
        timeElapsed: time_elapsed(startedOn),
        response: currentQuestion.answer,
      });
      if (data) {
        dispatch({ type: ActionType.SET_COMPLETED });
        setIsSubmitting(false);
        dispatch({ type: ActionType.HIDE_REVIEW });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Stack divider={<Divider />} spacing={2}>
      <Stack alignItems="center">
        <Typography variant="s14w6c700" color="#B54708">
          Questions
        </Typography>
      </Stack>

      <Grid container direction="row" spacing={1}>
        {questions.map((q) => (
          <Grid item xs={2.4} key={q.index}>
            <Stack
              onClick={() => loadQuestion(q)}
              sx={{
                background: get_question_color(q)?.background,
                borderRadius: 2.5,
                height: 28,
                width: 28,
                cursor: "pointer",
              }}
              alignItems="center"
              justifyContent="center">
              <Typography
                variant="s14w5c400"
                color={get_question_color(q)?.color}>
                {q.index}
              </Typography>
              {q.isSkipped && <Circle sx={{ fontSize: 3, color: "#fd5400" }} />}
              {isLatest(q) && <Circle sx={{ fontSize: 3, color: "#198754" }} />}
            </Stack>
          </Grid>
        ))}
        <Stack
          width="100%"
          mt={3}
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}>
          <Tooltip title="You can submit the assessment once all the question are visited.">
            <span>
              <LoadingButton
                fullWidth
                loading={submitting}
                onClick={handle_submit}
                disabled={!show_submit_button()}
                size="small"
                variant="contained">
                Submit Assessment
              </LoadingButton>
            </span>
          </Tooltip>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default TheatreExperience;
