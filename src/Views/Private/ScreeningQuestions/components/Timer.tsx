import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../../App/hooks";
import { useCountdown } from "../../../../hooks/useCountdown";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { submit_answer } from "../../../../API";
import { time_elapsed } from "../utils";
import { ActionType } from "../../../../Store/action-types";

const Timer = ({ isSmall = false }: { isSmall?: boolean }) => {
  const dispatch = useDispatch();
  const { endsOn, currentQuestion, userAssessmentId, startedOn } =
    useAppSelector((state) => state.assessment_app);

  const timer = useCountdown(endsOn);

  const box_style = {
    background: "#fef0c7",
    p: isSmall ? 0.5 : 1,
    borderRadius: 2.5,
    width: isSmall ? 40 : 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  async function complete_assessment() {
    try {
      const { data } = await submit_answer({
        userAssessmentId: userAssessmentId,
        question: currentQuestion.question._id,
        isComplete: true,
        response: currentQuestion.answer ? currentQuestion.answer : "Skip",
        timeElapsed: time_elapsed(startedOn),
      });
      if (data) {
        dispatch({ type: ActionType.SET_COMPLETED });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (timer.isOver) {
      complete_assessment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.isOver]);

  const variant = isSmall ? "s20w6c700" : "s36w8c500";
  return (
    <Stack spacing={2}>
      {!isSmall && <Typography variant="s14w6c700">Time Remaining</Typography>}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <Stack sx={box_style}>
          <Typography
            variant={variant}
            color="#FDB022"
          >
            {timer.minutes}
          </Typography>
        </Stack>
        <Typography
          variant={variant}
          color="#FDB022"
        >
          :
        </Typography>
        <Stack sx={box_style}>
          <Typography
            variant={variant}
            color="#FDB022"
          >
            {timer.seconds}
          </Typography>{" "}
        </Stack>
      </Stack>
      {!isSmall && (
        <Typography
          variant="s14w6c700"
          color="#B54708"
        >
          {timer.isOver && "Time Over!"}
        </Typography>
      )}
    </Stack>
  );
};

export default Timer;
