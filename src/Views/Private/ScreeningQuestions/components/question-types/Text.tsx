import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../App/hooks";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../../../Store/action-types";
import {
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { JSX } from "react/jsx-runtime";

const Text = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [text, setText] = useState("");
  const { screeningQuestions, verifyCandidateResponse,currentScreeningAnswer } = useAppSelector(
    (state) => state.assessment_app
  );
  const { currentQNumber } = screeningQuestions;
  const { screeningQ } = verifyCandidateResponse.applicant.job;
  const currentQuestion = screeningQ[currentQNumber];
useEffect(()=>{
if(currentScreeningAnswer.answer=="")
setText("")
},[])
  const handleChange = (event: any) => {
    setText(event.target.value);
    // dispatch({
    //   type: ActionType.UPDATE_ANSWER_SQ,
    //   payload: {
    //     currentQNumber: currentQNumber,
    //     answers: [
    //       ...screeningQuestions.answers,
    //       { question: currentQuestion.question, answer: event.target.value },
    //     ],
    //   },
    // });
    dispatch({
      type: ActionType.UPDATE_CURRENT_SQ,
      payload: {
        question: currentQuestion.question,
        answer: event.target.value,
      },
    });
  };

  // const handleSubmit = () => {

  //   dispatch({
  //     type: ActionType.UPDATE_ANSWER_SQ,
  //     payload: {
  //       currentQNumber: currentQNumber,
  //       answers: [
  //         ...screeningQuestions.answers,
  //         { question: currentQuestion.question, answer:text },
  //       ],
  //     },
  //   });
  // };

  return (
    <Stack pt={3}>
      {/* <form onSubmit={handleSubmit}> */}
      <TextField
        onChange={handleChange}
        value={currentScreeningAnswer.answer}
        type={currentQuestion.type}
      ></TextField>
      {/* </form> */}
    </Stack>
  );
};

export default Text;
