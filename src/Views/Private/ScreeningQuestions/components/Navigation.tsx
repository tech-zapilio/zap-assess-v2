import { Stack } from "@mui/material";
import { useAppSelector } from "../../../../App/hooks";
import {
  AnswerResponse,
  Question,
} from "../../../../Types/assessment-app-types";
import { submit_answer, submit_SQ } from "../../../../API";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../../Store/action-types";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { get_first_question } from "../../../../API";
const Navigation = () => {
  const dispatch = useDispatch();
  //
  const navigate = useNavigate();

  //
  const {
    screeningQuestions,
    verifyCandidateResponse,
    currentScreeningAnswer,
  } = useAppSelector((state) => state.assessment_app);
  const { currentQNumber } = screeningQuestions;
  const [loading, setLoading] = useState(false);

  const { screeningQ } = verifyCandidateResponse.applicant.job;
  const currentQuestion = screeningQ[currentQNumber];
  const answered = currentQNumber < screeningQuestions.answers.length;
  console.log(
    "currentQNumber < screeningQuestions.answers.length;",
    currentQNumber,
    screeningQuestions.answers.length,

    screeningQuestions.answers,
    currentScreeningAnswer
  );

  async function handleNext() {
    if (screeningQ.length === currentQNumber + 1) {
      // dispatch({
      //   type: ActionType.UPDATE_ANSWER_SQ,
      //   payload: {
      //     currentQNumber: currentQNumber,
      //     answers: screeningQuestions.answers,
      //   },
      // });

      dispatch({
        type: ActionType.UPDATE_ANSWER_SQ,
        payload: {
          currentQNumber: currentQNumber,
          answers: [...screeningQuestions.answers, currentScreeningAnswer],
        },
      });

      dispatch({
        type: ActionType.UPDATE_OPEN_SQ_MODAL_OPEN,
        payload: false,
      });

      try {
        setLoading(true);
        const { data } = await submit_SQ([
          ...screeningQuestions.answers,
          currentScreeningAnswer,
        ]);
        if (data) {
          console.log("data", data);

          // dispatch({ type: ActionType.VERIFY_CANDIDATE, payload: data });
          // sessionStorage.setItem("applicant", JSON.stringify(data));
          // if (data.applicant.job.screeningQ.length == 0)
          // navigate("/assessment-details");
          // else navigate("/assessment-screening-questions");

          setLoading(false);
          try {
            // dispatch({
            //   type: ActionType.CLEAR_PREV_ASSESSMENT,
            // });

            dispatch({
              type: ActionType.START_ASSESSMENT,
              payload: {
                userAssessmentId: "",
                assessmentLib: {
                  questions:
                    verifyCandidateResponse.applicant.assessment.totalQuestions,
                  duration:
                    verifyCandidateResponse.applicant.assessment.totalTime,
                  name: verifyCandidateResponse.applicant.assessment.name,
                },
              },
            });
          } catch (error) {
            console.log(error);
          }
        }
        // const {data} = await
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    // dispatch({
    //   type: ActionType.UPDATE_ANSWER_SQ,
    //   payload: {
    //     currentQNumber: currentQNumber + 1,
    //     answers: screeningQuestions.answers,
    //   },
    // });
    else
      dispatch({
        type: ActionType.UPDATE_ANSWER_SQ,
        payload: {
          currentQNumber: currentQNumber + 1,
          answers: [...screeningQuestions.answers, currentScreeningAnswer],
        },
      });

    //start loading
  }
  return (
    <Stack
      // mt={4}
      direction="row"
      alignItems="center"
      justifyContent="start"
    >
      <LoadingButton
        loading={loading}
        disabled={currentScreeningAnswer.answer == ""}
        onClick={handleNext}
        size="large"
        variant="contained"
      >
        {screeningQ.length === currentQNumber + 1
          ? "Start Assessment"
          : "Next"}
      </LoadingButton>
    </Stack>
  );
};

export default Navigation;
