import { Stack } from "@mui/material";
import { useAppSelector } from "../../../../App/hooks";
import {
  AnswerResponse,
  Question,
} from "../../../../Types/assessment-app-types";
import { submit_answer } from "../../../../API";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../../Store/action-types";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { time_elapsed } from "../utils";

const Navigation = () => {
  const dispatch = useDispatch();
  const {
    currentQuestion,
    startedOn,
    userAssessmentId,
    questions,
    isSkip,
    questionLoading,
  } = useAppSelector((state) => state.assessment_app);

  const answerResponse: AnswerResponse = {
    userAssessmentId: userAssessmentId,
    question: currentQuestion.question._id,
    isComplete: false,
    response: currentQuestion.answer,
    timeElapsed: "00:00",
  };

  const answer = currentQuestion.answer;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  //
  //
  function get_next_skipped_question_index() {
    let index;
    for (let i = 0; i < questions.length; i++) {
      if (
        questions[i].isSkipped &&
        currentQuestion.index !== questions[i].index
      ) {
        index = questions[i].index;
        return index;
      }
    }
    return index;
  }

  //
  //
  function get_next_unanswered_index() {
    let index;
    for (let i = currentQuestion.index; i < questions.length; i++) {
      if (!questions[i].question._id) {
        index = questions[i].index;
        return index;
      }
    }
    return index;
  }

  //
  //
  function handle_complete() {
    dispatch({ type: ActionType.SET_COMPLETED });
  }

  //
  //
  function get_next_question_index() {
    const next_skipped_question = get_next_skipped_question_index();
    const next_unanswered_index = get_next_unanswered_index();

    //user is answering skipped questions
    if (isSkip) {
      if (next_skipped_question) {
        return next_skipped_question;
      } else {
        handle_complete();
      }
    }

    //return next unanswered question question (Default )
    return next_unanswered_index;
  }

  //
  //
  function load_next_question(question: Question) {
    const next_question_index = get_next_question_index();

    if (next_question_index) {
      if (isSkip) {
        //load the skipped question
        dispatch({
          type: ActionType.LOAD_QUESTION_BY_INDEX,
          payload: next_question_index,
        });
      } else {
        //load the question received from API response
        dispatch({
          type: ActionType.GET_QUESTION,
          payload: {
            question: question,
            index: next_question_index,
            isAnswered: false,
            isSkipped: false,
            answer: "",
          },
        });
      }
    }
    return;
  }

  //TODO: Handle isCompleted
  async function mark_answered() {
    const next_question_index = get_next_question_index();

    const is_last = is_last_question();
    if (is_last) {
      try {
        setIsSkipping(true);
        dispatch({ type: ActionType.START_QUESTION_LOADING });

        answerResponse.response = currentQuestion.answer;
        answerResponse.timeElapsed = time_elapsed(startedOn);
        answerResponse.isComplete = true;

        const { data } = await submit_answer(answerResponse);

        if (data) {
          dispatch({ type: ActionType.END_QUESTION_LOADING });
          setIsSkipping(false);
          handle_complete();
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: ActionType.END_QUESTION_LOADING });
        setIsSkipping(false);
      }
    }

    dispatch({
      type: ActionType.UPDATE_QUESTION_STATUS,
      payload: {
        index: currentQuestion.index,
        isSkipped: false,
        isAnswered: true,
      },
    });

    dispatch({
      type: ActionType.LOAD_QUESTION_BY_INDEX,
      payload: next_question_index,
    });
  }

  //
  //

  function is_last_question() {
    const loaded_questions = questions.filter(
      (q) => q.question?._id?.length > 0
    );
    const skipped_questions = questions.filter(
      (q) => q.isSkipped && q.index !== currentQuestion.index
    );
    //No Skipped questions and loaded questions = total questions
    return (
      skipped_questions.length === 0 &&
      loaded_questions.length === questions.length
    );
  }

  //
  //
  async function handleNext() {
    //start loading
    setIsSubmitting(true);

    //set the answer and time elapsed
    answerResponse.response = currentQuestion.answer;
    answerResponse.timeElapsed = time_elapsed(startedOn);

    try {
      dispatch({ type: ActionType.START_QUESTION_LOADING });

      const is_last = is_last_question();
      const is_last_index = currentQuestion.index === questions.length;
      //user answered the last question and some skipped questions are there
      if (is_last_index && !is_last) {
        dispatch({ type: ActionType.SHOW_REVIEW });
        dispatch({ type: ActionType.END_QUESTION_LOADING });
        setIsSubmitting(false);
        return;
      }

      //no skipped questions are left any index
      if (is_last) {
        answerResponse.isComplete = true;
      }

      const { data } = await submit_answer(answerResponse);

      if (data) {
        dispatch({
          type: ActionType.SUBMIT_ANSWER,
          payload: { ...currentQuestion, isAnswered: true, isSkipped: false },
        });

        if (is_last) {
          handle_complete();
        } else {
          if (
            !questions.map((q) => q.question._id).includes(data.question._id)
          ) {
            load_next_question(data?.question);
          } else {
            const index = get_next_skipped_question_index();
            dispatch({
              type: ActionType.LOAD_QUESTION_BY_INDEX,
              payload: index,
            });
          }
        }
      }
      setIsSubmitting(false);
      dispatch({ type: ActionType.END_QUESTION_LOADING });
    } catch (error) {
      setIsSubmitting(false);
    }
  }

  // function allQuestionsLoadedAndSkippedLeft() {
  //   //all questions loaded && current Question is skipped && more Skipped questions are there
  //   const loaded_questions = questions.filter(
  //     (q) => q.question?._id?.length > 0
  //   );
  //   const skipped_questions = questions.filter(
  //     (q) => q.isSkipped && q.index !== currentQuestion.index
  //   );
  //   const isCurrentQuestionSKipped = currentQuestion.isSkipped;

  //   return (
  //     loaded_questions.length === questions.length &&
  //     skipped_questions.length > 1 &&
  //     isCurrentQuestionSKipped
  //   );
  // }

  //
  //

  async function handleSkip() {
    //SKIPPED QUESTION SKIPPED AGAIN (MARK ANSWERED)
    if (currentQuestion.isSkipped) {
      mark_answered();
      return;
    }

    dispatch({ type: ActionType.UPDATE_ANSWER, payload: "Skip" });

    const is_last = is_last_question();
    const is_last_index = currentQuestion.index === questions.length;

    answerResponse.response = "Skip";
    answerResponse.timeElapsed = time_elapsed(startedOn);

    setIsSkipping(true);

    if (is_last_index && !is_last) {
      dispatch({ type: ActionType.SHOW_REVIEW });
      setIsSkipping(false);
      return;
    }

    try {
      dispatch({ type: ActionType.START_QUESTION_LOADING });
      const { data } = await submit_answer(answerResponse);
      if (data) {
        dispatch({
          type: ActionType.SUBMIT_ANSWER,
          payload: { ...currentQuestion, isAnswered: false, isSkipped: true },
        });

        if (is_last) {
          handle_complete();
        } else {
          load_next_question(data.question);
        }
      }
      setIsSkipping(false);
      dispatch({ type: ActionType.END_QUESTION_LOADING });
    } catch (error) {
      console.log(error);
      setIsSkipping(false);
    }
  }

  return (
    <Stack
      mt={4}
      direction="row"
      alignItems="center"
      justifyContent="space-between">
      <LoadingButton
        disabled={
          (currentQuestion.isSkipped && !isSkip) ||
          questionLoading ||
          is_last_question()
        }
        loading={isSkipping}
        onClick={handleSkip}
        size="large"
        variant="outlined">
        {currentQuestion.isSkipped && isSkip ? "Skip" : "Revisit Later"}
      </LoadingButton>

      <LoadingButton
        loading={isSubmitting}
        disabled={!answer}
        onClick={handleNext}
        size="large"
        variant="contained">
        Submit
      </LoadingButton>
    </Stack>
  );
};

export default Navigation;
