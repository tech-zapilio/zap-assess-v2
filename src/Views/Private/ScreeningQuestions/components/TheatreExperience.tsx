import { Circle } from "@mui/icons-material";
import {
  Grid,
  Typography,
  Stack,
  Tooltip,
  Divider,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { QuestionIndex } from "../../../../Types/assessment-app-types";
import { ActionType } from "../../../../Store/action-types";
import { useAppSelector } from "../../../../App/hooks";
import { useState } from "react";
import { submit_answer } from "../../../../API";
import { time_elapsed } from "../../Assessment/utils";
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
    <Stack>
      <Typography variant="s12w4c500">
        This timer has been paused for a quick challenge, answer the following
        questions to continue the assessment.
      </Typography>
    </Stack>
  )
};

export default TheatreExperience;
