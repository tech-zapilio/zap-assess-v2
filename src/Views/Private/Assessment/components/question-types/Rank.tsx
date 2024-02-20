import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../App/hooks";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../../../Store/action-types";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { JSX } from "react/jsx-runtime";

const Rank = () => {
  const dispatch = useDispatch();
  const { currentQuestion } = useAppSelector((state) => state.assessment_app);
  const [sorted, setSorted] = useState([] as string[]);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    if (!sorted.length) {
      const options = currentQuestion.question.options.map((o) => o.value);
      setSorted(options);
    }
    // dispatch({ type: ActionType.UPDATE_ANSWER, payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleOrder(result: any) {
    const destination = result.destination.index;
    const source = result.source.index;

    if (!result.destination) return;

    const items = Array.from(sorted);
    const [reorderedItems] = items.splice(source, 1);
    items.splice(destination, 0, reorderedItems);

    setSorted(items);
    dispatch({ type: ActionType.UPDATE_ANSWER, payload: items.join("|") });
  }

  return (
    <Stack>
      <DragDropContext onDragEnd={handleOrder}>
        <Droppable droppableId="droppable">
          {(provided: {
            placeholder: React.ReactNode;
            droppableProps: JSX.IntrinsicAttributes &
              React.ClassAttributes<HTMLUListElement> &
              React.HTMLAttributes<HTMLUListElement>;
            innerRef: React.LegacyRef<HTMLUListElement> | undefined;
          }) => (
            <ul
              style={{ listStyleType: "none", padding: 0 }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sorted.map((option, index) => (
                <Draggable key={option} draggableId={option} index={index}>
                  {(provided: {
                    draggableProps: JSX.IntrinsicAttributes &
                      React.ClassAttributes<HTMLLIElement> &
                      React.LiHTMLAttributes<HTMLLIElement>;
                    dragHandleProps: JSX.IntrinsicAttributes &
                      React.ClassAttributes<HTMLLIElement> &
                      React.LiHTMLAttributes<HTMLLIElement>;
                    innerRef: React.LegacyRef<HTMLLIElement> | undefined;
                  }) => (
                    <li
                      style={{ listStyle: "none" }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Stack
                        my={2}
                        onMouseEnter={() => setSelectedOption(option)}
                        alignItems="flex-start"
                        justifyContent="center"
                        sx={{
                          userSelect: "none",
                          height: 40,
                          borderRadius: 2.5,
                          border: "1px solid",
                          p: 1,
                          borderColor:
                            selectedOption === option
                              ? "#fd5400"
                              : theme.palette.grey[300],
                          background:
                            selectedOption === option ? "#FFEAD5" : "#fcfcfd",
                        }}
                      >
                        <Typography
                          color={
                            selectedOption === option
                              ? "#FB6514"
                              : theme.palette.grey[700]
                          }
                          variant={isSmallScreen ? "s16w6c700" : "s20w6c800"}
                          fontWeight={400}
                        >
                          {option}
                        </Typography>
                      </Stack>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided?.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
  );
};

export default Rank;
