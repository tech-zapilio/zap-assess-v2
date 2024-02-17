import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import screenfull from "screenfull";
import { Divider, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ErrorOutline } from "@mui/icons-material";
import { submit_answer } from "../../../API";
import { ActionType } from "../../../Store/action-types";
import { useAppSelector } from "../../../App/hooks";
import { time_elapsed } from "./utils";
import { useState } from "react";
const style = {
  position: "absolute",
  bottom: "10%",
  right: "10%",
  borderRadius: 2,
  width: 400,
  border: "none",
  outline: "none",
  bgcolor: "background.paper",
};

export default function WarningModal() {
  const dispatch = useDispatch();
  const [counter, setCounter] = React.useState(30);
  const [loading, setLoading] = React.useState(false);
  const {
    questions,
    currentQuestion,
    questionLoading,
    drawerOpen,
    startedOn,
    userAssessmentId,
  } = useAppSelector((state) => state.assessment_app);
  const [isSubmitting, setIsSubmitting] = useState(false);
  function handle_complete() {
    dispatch({ type: ActionType.SET_COMPLETED });
  }

  React.useEffect( () => {
    async function call(){
    if (counter === 0) {
      // dispatch(
      //   SubmitAnswer(
      //     Answer?.response
      //       ? { ...Answer, isComplete: true, timeElapsed: timeSpent, notes: "Full Screen Violation" }
      //       : { question: Question?._id, response: "skip", isComplete: true, timeElapsed: timeSpent, notes: "Full Screen Violation" },
      //     setAnswer,
      //     setLoading,
      //     true
      //   )
      // );
      try {
        dispatch({ type: ActionType.START_QUESTION_LOADING });

        const is_last = true;
        //user answered the last question and some skipped questions are there

        //no skipped questions are left any index
        // if (is_last) {
        //   answerResponse.isComplete = true;
        // }

        const { data } = await submit_answer({
          userAssessmentId: userAssessmentId,
          question: currentQuestion.question._id,
          isComplete: true,
          timeElapsed: time_elapsed(startedOn),
          response: currentQuestion.answer,
        });

        if (data) {
          dispatch({
            type: ActionType.SUBMIT_ANSWER,
            payload: { ...currentQuestion, isAnswered: true, isSkipped: false },
          });

          handle_complete();
        }
        setIsSubmitting(false);
        dispatch({ type: ActionType.END_QUESTION_LOADING });
      } catch (error) {
        setIsSubmitting(false);
      }
    }
  }
  call()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  // Third Attempts
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <Box sx={style}>
            <Stack>
              <Stack direction="row" p={2} alignItems="center" spacing={1}>
                <ErrorOutline sx={{ color: "#f40000" }} />
                <Typography variant="titleSmall" color="Text.main">
                  Fullscreen not detected!
                </Typography>
              </Stack>
              <Divider />
              <Stack p={2} pb={1}>
                {counter === 0 ? (
                  // Render a completed state

                  <Typography variant="title4" color="Text.Subs">
                    Assessment submitted!
                  </Typography>
                ) : (
                  <Typography variant="title4" color="Text.Subs">
                    Switch to fullscreen in <b>{counter} </b> seconds or the
                    assessment will be automatically submitted.
                  </Typography>
                )}
              </Stack>
              <Stack p={2}>
                <LoadingButton
                  loading={loading}
                  variant="outlined"
                  disableElevation
                  onClick={() => {
                    if (screenfull.isEnabled) {
                      screenfull.request();
                    }
                  }}
                >
                  Go fullscreen
                </LoadingButton>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
