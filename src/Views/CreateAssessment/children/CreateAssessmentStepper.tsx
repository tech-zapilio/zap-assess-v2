import { IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ResetTv } from "@mui/icons-material";
import { resetForm } from "../../../../store/app/app-slice";

const CreateAssessmentStepper = () => {
  const dispatch = useAppDispatch();
  const { formSettings } = useAppSelector(
    (state) => state.app.createAssessmentForm
  );

  function getStepProgress(step: string): number {
    if (formSettings?.completedSteps?.includes(step)) {
      return 100;
    } else if (formSettings.currentStep === step) {
      return 50;
    } else {
      return 0;
    }
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
    >
      {formSettings.steps.map((step) => (
        <Stack
          key={step.label}
          spacing={1}
          alignItems="center"
        >
          <Typography variant="s12w5c500">{step.label} </Typography>
          <LinearProgress
            variant="determinate"
            value={getStepProgress(step.label)}
            key={step.label}
            color="success"
            sx={{ width: 100, height: 10, borderRadius: 3 }}
          />
        </Stack>
      ))}
      <IconButton onClick={() => dispatch(resetForm())}>
        <ResetTv />
      </IconButton>
    </Stack>
  );
};

export default CreateAssessmentStepper;
