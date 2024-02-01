import { Box, Container, Stack } from "@mui/material";
import BackButton from "../../../Components/Navigation/BackButton";

import CreateAssessmentStepper from "./children/CreateAssessmentStepper";
import Title from "./children/Title";
import SelectSkill from "./steps/SelectSkill";
import { useAppSelector } from "../../../store/hooks";
import SelectDuration from "./steps/SelectDuration";
import Navigation from "./children/Navigation";
import JobSettings from "./steps/JobSettings";
import Review from "./steps/Review";

const CreateAssessment = () => {
  const { formSettings } = useAppSelector(
    (state) => state.app.createAssessmentForm
  );

  return (
    <Box>
      <BackButton title="Create Assessment">
        <CreateAssessmentStepper />
      </BackButton>
      <Stack mb={4}>
        <Title />
      </Stack>
      <Container maxWidth="xl">
        <Stack>
          {
            {
              Skills: <SelectSkill />,
              Duration: <SelectDuration />,
              "Job Settings": <JobSettings />,
              Review: <Review />,
            }[formSettings.currentStep]
          }
        </Stack>
        <Navigation />
      </Container>
    </Box>
  );
};

export default CreateAssessment;
