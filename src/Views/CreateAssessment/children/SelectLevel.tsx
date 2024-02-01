import { Grid, Stack, Typography } from "@mui/material";
import LevelCard from "./LevelCard";
import { jobRoleLevels } from "../../../../json/assessment-levels";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { updateAssessmentForm } from "../../../../store/app/app-slice";

const SelectLevel = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.app.createAssessmentForm);
  function updateLevel(level: string) {
    dispatch(updateAssessmentForm({ ...form, level: level }));
  }
  return (
    <Stack spacing={2}>
      <Typography variant="s20w6c800"> Job Role Level</Typography>
      <Stack>
        <Grid
          container
          spacing={2}
        >
          {jobRoleLevels.map((level) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={3}
              key={level.label}
            >
              <LevelCard
                selected={form.level === level.value}
                onClick={updateLevel}
                level={level}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default SelectLevel;
