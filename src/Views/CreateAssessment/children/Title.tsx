import { Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toggleSkillDrawer } from "../../../../store/app/app-slice";
const Title = () => {
  const dispatch = useAppDispatch();
  const { formSettings } = useAppSelector(
    (state) => state.app.createAssessmentForm
  );

  function toggle_skills() {
    dispatch(toggleSkillDrawer(true));
  }
  const data = formSettings.steps.find(
    (s) => s.label === formSettings.currentStep
  );
  return (
    <Stack
      mt={4}
      alignItems="center"
      spacing={1}
    >
      <Typography
        variant="s36w8c500"
        color="text.900"
        onClick={toggle_skills}
      >
        {" "}
        {data?.label}{" "}
      </Typography>
      <Typography
        variant="s18w4c500"
        fontWeight={500}
      >
        {data?.desc}
      </Typography>
    </Stack>
  );
};

export default Title;
