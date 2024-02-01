import { LoadingButton } from "@mui/lab";
import { Divider, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { completeStep, setActiveStep } from "../../../../store/app/app-slice";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { form, formSettings } = useAppSelector(
    (state) => state.app.createAssessmentForm
  );

  function handleNext() {
    switch (formSettings.currentStep) {
      case "Skills":
        if (form.level && form.skills.length) {
          dispatch(completeStep("Skills"));
          dispatch(setActiveStep("Duration"));
        }
        break;
      case "Duration":
        if (form.duration > 20) {
          dispatch(completeStep("Duration"));
          dispatch(setActiveStep("Job Settings"));
        }
        break;
      case "Job Settings":
        if (form.duration > 20) {
          dispatch(completeStep("Job Settings"));
          dispatch(setActiveStep("Review"));
        }
        break;
      case "Review":
        if (form.duration > 20) {
          navigate("/job-published");
        }
        break;

      default:
        break;
    }
  }

  function handlePrev() {
    const idex = formSettings.steps
      .map((s) => s.label)
      .indexOf(formSettings.currentStep);
    dispatch(setActiveStep(formSettings.steps[idex - 1].label));
  }
  return (
    <Stack
      sx={{
        position: "fixed",
        backgroundColor: "#fff",
        minWidth: "100vw",
        left: 0,
        right: 0,
        bottom: 0,
      }}
      alignItems="center"
    >
      <Stack width="100%">
        <Divider />
      </Stack>

      <Stack
        py={2}
        direction="row"
        alignItems="center"
        spacing={2}
      >
        {formSettings.currentStep !== "Skills" && (
          <LoadingButton
            variant="outlined"
            onClick={handlePrev}
          >
            Previous
          </LoadingButton>
        )}
        <LoadingButton
          variant="contained"
          onClick={handleNext}
        >
          Next
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default Navigation;
