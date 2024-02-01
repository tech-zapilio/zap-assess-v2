import SelectLevel from "../children/SelectLevel";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import SelectSkillsDrawer from "../children/SelectSkillsDrawer";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ExtractedSkill } from "../../../../store/app/app-types";
import SkillTag from "../children/SkillTag";
import { AddOutlined, Delete } from "@mui/icons-material";
import {
  toggleSkillDrawer,
  updateAssessmentForm,
} from "../../../../store/app/app-slice";

const card_styles = {
  boxShadow: "0px 4px 20px -2px rgba(16, 24, 40, 0.08)",
  p: 3,
  flexGrow: 1,
};

const AddSkillCard = () => {
  const dispatch = useAppDispatch();

  function openSkillDrawer() {
    dispatch(toggleSkillDrawer(true));
  }
  return (
    <Stack sx={card_styles}>
      <Stack
        sx={{ cursor: "pointer" }}
        onClick={openSkillDrawer}
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <AddOutlined />
        <Typography variant="s20w6c700">Select Skill</Typography>
      </Stack>
    </Stack>
  );
};
const SkillCard = ({
  skill,
  index,
}: {
  skill: ExtractedSkill;
  index: number;
}) => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.app.createAssessmentForm);
  function removeSkill() {
    dispatch(
      updateAssessmentForm({
        ...form,
        skills: form.skills.filter((s) => s !== skill.Skill),
      })
    );
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={4}
    >
      <Stack>
        <Typography
          variant="s28w6c800"
          color="text.300"
        >
          {index + 1}
        </Typography>
      </Stack>
      <Stack sx={card_styles}>
        <Stack spacing={2.5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="s20w6c700">{skill.Skill}</Typography>
            <IconButton onClick={removeSkill}>
              <Delete />
            </IconButton>
          </Stack>
          <Stack>
            <Grid
              container
              spacing={2}
            >
              {skill.Alias.split(",")
                .slice(0, 10)
                .map((skill) => (
                  <Grid
                    item
                    key={skill}
                  >
                    <SkillTag
                      title={skill}
                      selected={false}
                    />
                  </Grid>
                ))}
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const SelectSkill = () => {
  const { extractedSkills, form } = useAppSelector(
    (state) => state.app.createAssessmentForm
  );

  return (
    <Stack>
      <SelectSkillsDrawer />
      <SelectLevel />
      <Stack mt={2}>
        <Stack spacing={2.5}>
          {extractedSkills
            .filter((s) => form.skills.join(",").includes(s.Skill))
            .map((skill, index) => (
              <SkillCard
                key={index}
                skill={skill}
                index={index}
              />
            ))}
          <AddSkillCard />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SelectSkill;
