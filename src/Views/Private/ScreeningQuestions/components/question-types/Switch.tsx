import { useAppSelector } from "../../../../../App/hooks";
import { useDispatch } from "react-redux";
import Option from "../Option";
import { Stack } from "@mui/material";
import { ActionType } from "../../../../../Store/action-types";

const Switch = () => {
  const dispatch = useDispatch();
  const { currentQuestion } = useAppSelector((state) => state.assessment_app);
  const options = currentQuestion.question.range.split("|");

  function handle_option(value: string) {
    dispatch({ type: ActionType.UPDATE_ANSWER, payload: value });
  }
  return (
    <Stack mt={2} spacing={1} width="100%">
      {options.map((option) => (
        <Option selected={currentQuestion.answer === option} onClick={() => handle_option(option)}>
          {option}
        </Option>
      ))}
    </Stack>
  );
};

export default Switch;
