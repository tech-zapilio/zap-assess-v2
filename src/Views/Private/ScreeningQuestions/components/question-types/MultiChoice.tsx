import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../App/hooks";
import { ActionType } from "../../../../../Store/action-types";
import Option from "../Option";
import { useState } from "react";
const MultiChoice = () => {
  // const { currentQuestion } = useAppSelector((state) => state.assessment_app);
  const { screeningQuestions, verifyCandidateResponse,currentScreeningAnswer } = useAppSelector(
    (state) => state.assessment_app
  );
  const { currentQNumber } = screeningQuestions;
  const { screeningQ } = verifyCandidateResponse.applicant.job;
  const currentQuestion = screeningQ[currentQNumber];
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();

  let selected_options = currentQuestion?.answer?.split("|") || [];

  function handle_pick_one_answer(value: string) {
    dispatch({
      type: ActionType.UPDATE_ANSWER_SQ,
      payload: {
        currentQNumber: currentQNumber,
        answers: [
          ...screeningQuestions.answers,
          { question: currentQuestion.question, answer: value },
        ],
      },
    });
  }
console.log("sele",selected);

  function update_answer(value: string) {
    setSelected(value);
    //PICK ONE QUESTION TYPE
    if (currentQuestion.type === "pickOne") {
      handle_pick_one_answer(value);
      return;
    }

    //PICK MULTI QUESTION TYPE
    const isAnswerIncluded = selected_options?.includes(value);
    if (isAnswerIncluded) {
      selected_options = selected_options.filter((o) => o !== value);
    } else {
      selected_options = selected_options.concat(value);
    }
    // dispatch({
    //   type: ActionType.UPDATE_ANSWER_SQ,
    //   payload: {
    //     currentQNumber: currentQNumber,
    //     answers: [
    //       ...screeningQuestions.answers,
    //       {
    //         question: currentQuestion.question,
    //         answer: selected_options.join("|"),
    //       },
    //     ],
    //   },
    // });
    dispatch({
      type: ActionType.UPDATE_CURRENT_SQ,
      payload: {
        question: currentQuestion.question,
        answer: value,
      },
    });
  }
  return (
    <Stack mt={2} spacing={1}>
      {currentQuestion.options.map((option) => (
        <Option
          key={option}
          selected={option == currentScreeningAnswer.answer }
          onClick={() => update_answer(option)}
        >
          {option}
        </Option>
      ))}
    </Stack>
  );
};

export default MultiChoice;
