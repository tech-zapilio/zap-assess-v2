import { useEffect } from "react";
import { useAppSelector } from "../../../App/hooks";
import { get_first_question } from "../../../API";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../Store/action-types";
import { Box, Container, Grid, Stack, useMediaQuery } from "@mui/material";
import Timer from "./components/Timer";
import QuestionContainer from "./components/QuestionContainer";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import TheatreExperience from "./components/TheatreExperience";
import patternRight from "../../../Assets/SVGs/patter1-list.svg";
import patternLeft from "../../../Assets/SVGs/pattern2-lite.svg";
import ReviewModal from "./components/ReviewModal";
import Completed from "./Completed";
import TheatreDrawer from "./components/TheatreDrawer";

const question_container_styles = {
  background: "#eaecf0",
  backgroundImage: `url(${patternLeft}),  url(${patternRight})`,
  backgroundRepeat: "no-repeat, no-repeat",
  backgroundPosition: "left, right",

  boxShadow: "0px 24px 48px -12px rgba(16, 24, 40, 0.18)",
  borderRadius: 2.5,
};
const Assessment = () => {
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { questions, endsOn } = useAppSelector((state) => state.assessment_app);

  useEffect(() => {
    dispatch({ type: ActionType.END_QUESTION_LOADING });
    const firstQuestion = questions.find((q) => q.index === 1);
    if (!firstQuestion?.question?._id) {
      getFirstQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getFirstQuestion() {
    try {
      dispatch({ type: ActionType.START_QUESTION_LOADING });
      const { data } = await get_first_question();
      if (data) {
        dispatch({
          type: ActionType.GET_QUESTION,
          payload: {
            index: 1,
            question: data.question,
          },
        });
        dispatch({ type: ActionType.END_QUESTION_LOADING });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Stack>
      <TheatreDrawer />
      <Stack width="100vw">
        <Header />
      </Stack>
      <ReviewModal />
      <Grid px={{ xs: 2, md: 8 }} mt={4}>
        <Grid container columnSpacing={6}>
          {!isSmallScreen && (
            <Grid item md={2}>
              <Stack alignItems="center">
                <Stack px={8} pt={4} pb={2}>
                  {endsOn && <Timer />}
                </Stack>

                <Stack py={3.5}>
                  <TheatreExperience />
                </Stack>
              </Stack>
            </Grid>
          )}
          <Grid item xs={12} md={10}>
            <Grid>
              <Grid p={{ xs: 2, md: 5 }} sx={question_container_styles}>
                <Container maxWidth="md">
                  <Grid>
                    <QuestionContainer />
                    <Navigation />
                  </Grid>
                </Container>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

const AppContainer = () => {
  const { isCompleted } = useAppSelector((state) => state.assessment_app);
  return <Box>{isCompleted ? <Completed /> : <Assessment />}</Box>;
};

export default AppContainer;
