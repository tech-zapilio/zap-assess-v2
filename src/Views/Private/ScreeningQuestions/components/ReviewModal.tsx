import {
  Fade,
  Modal,
  Box,
  Backdrop,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../../Store/action-types";
import { useAppSelector } from "../../../../App/hooks";
import { submit_answer } from "../../../../API";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { time_elapsed } from "../utils";

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
};

const ReviewModal = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    isReview,
    questions,
    userAssessmentId,
    startedOn,
    currentQuestion,
    verifyCandidateResponse,
  } = useAppSelector((state) => state.assessment_app);

  const skipped_questions = questions.filter((q) => q.isSkipped);
  const diSableRetrySkip = verifyCandidateResponse.applicant.job.retrySKIP;

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

  async function handle_start_skipped() {
    dispatch({ type: ActionType.END_QUESTION_LOADING });
    dispatch({ type: ActionType.ANSWER_SKIPPING });
    dispatch({
      type: ActionType.LOAD_QUESTION_BY_INDEX,
      payload: skipped_questions[0]?.index,
    });
    dispatch({ type: ActionType.HIDE_REVIEW });
    try {
      const data = await submit_answer({
        userAssessmentId: userAssessmentId,
        question: currentQuestion.question._id,
        isComplete: false,
        timeElapsed: time_elapsed(startedOn),
        response: currentQuestion.answer,
      });

      const is_skipped = currentQuestion.answer === "Skip";
      if (data) {
        dispatch({
          type: ActionType.SUBMIT_ANSWER,
          payload: {
            ...currentQuestion,
            isAnswered: !is_skipped,
            isSkipped: is_skipped,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal open={isReview} slots={{ backdrop: Backdrop }}>
      <Fade in={isReview}>
        <Box sx={modalStyles}>
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{}}
            >
              <Stack>
                <Typography color="#" variant="s24w6c900" fontWeight={600}>
                  HEY, WAIT!
                </Typography>
                <Typography color="#" variant="s24w6c900" fontWeight={500}>
                  We are not done yet!
                </Typography>
              </Stack>
            </Stack>
            <Typography mt={2} variant="s16w4c600">
              You’ve left a few questions unanswered. Take a stab at them!
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              {diSableRetrySkip && (
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  onClick={handle_start_skipped}
                >
                  Answer Skipped Questions
                </Button>
              )}
              <LoadingButton
                loading={isSubmitting}
                variant="outlined"
                onClick={handle_submit}
              >
                End Assessment
              </LoadingButton>{" "}
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ReviewModal;
