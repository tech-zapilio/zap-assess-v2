import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../App/hooks";
import { ActionType } from "../../../../../Store/action-types";
import Option from "../Option";

const MultiChoice = () => {
  const { currentQuestion } = useAppSelector((state) => state.assessment_app);

  const dispatch = useDispatch();

  let selected_options = currentQuestion?.answer?.split("|") || [];

  function handle_pick_one_answer(value: string) {
    dispatch({ type: ActionType.UPDATE_ANSWER, payload: value });
  }

  function update_answer(value: string) {
    //PICK ONE QUESTION TYPE
    if (currentQuestion.question.questionType === "pickOne") {
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
    dispatch({ type: ActionType.UPDATE_ANSWER, payload: selected_options.join("|") });
  }
  return (
    <Stack mt={2} spacing={1}>
      {currentQuestion.question.options.map((option) => (
        <Option
          key={option._id}
          selected={selected_options?.includes(option.value)}
          onClick={() => update_answer(option.value)}
        >
          {option.name}
        </Option>
      ))}
    </Stack>
  );
};

export default MultiChoice;
