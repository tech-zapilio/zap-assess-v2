import { Close, LocalActivity, Search } from "@mui/icons-material";
import {
  Drawer,
  Stack,
  Box,
  IconButton,
  Typography,
  Divider,
  Grid,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import SkillTag from "./SkillTag";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  loadExtractedSkills,
  toggleSkillDrawer,
  updateAssessmentForm,
} from "../../../../store/app/app-slice";
import rchilli from "../../../../json/rchili.json";
const SelectSkillsDrawer = () => {
  const dispatch = useAppDispatch();

  const { formSettings, form, extractedSkills } = useAppSelector(
    (state) => state.app.createAssessmentForm
  );

  function handleSkillSelect(skill: string) {
    if (form.skills.includes(skill)) {
      dispatch(
        updateAssessmentForm({
          ...form,
          skills: form.skills.filter((s) => s !== skill),
        })
      );
    } else {
      dispatch(
        updateAssessmentForm({ ...form, skills: form.skills.concat(skill) })
      );
    }
  }

  function handleClose() {
    dispatch(toggleSkillDrawer(false));
  }

  function getFilteredSkills(key: string) {
    return extractedSkills.filter((c) => c.SkillType === key);
  }
  return (
    //
    <Drawer
      variant="temporary"
      onClose={handleClose}
      open={formSettings.openSkillDrawer}
      elevation={2}
      anchor="right"
    >
      <Box>
        <Grid
          sx={{
            width: { xs: "90vw", md: 568 },
            borderTopLeftRadius: 30,
            height: "100vh",
            background: "#ffffff",
          }}
        >
          <Stack
            sx={{
              px: { xs: 2, md: 8.5 },
              py: { xs: 2, md: 4.5 },
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="s28w6c900">Skills</Typography>
              <Stack>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
                <IconButton
                  onClick={() => {
                    dispatch(loadExtractedSkills(rchilli));
                  }}
                >
                  <LocalActivity />
                </IconButton>
              </Stack>
            </Stack>
            <Stack mt={5.5}>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        background: "#344054",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: 7.5,
                      }}
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Search Skills"
              />
            </Stack>
            <Stack spacing={0.25} mt={2.5}>
              <Typography variant="s16w6c400"> Selected Skills </Typography>
              {/* <Typography variant="s12w4c600">
                {form?.skills?.join(" , ")}
              </Typography> */}
            </Stack>
          </Stack>
          <Divider />
          <Stack
            spacing={3}
            sx={{
              maxHeight: "calc(100vh - 320px)",
              overflowY: "auto",
              px: { xs: 2, md: 8.5 },
              py: { xs: 2, md: 4.5 },
            }}
          >
            <Stack>
              <Typography variant="s16w6c400">Operational Skills</Typography>
              <Grid mt={2} container spacing={1}>
                {getFilteredSkills("OperationalSkill").map((sk) => (
                  <Grid item key={sk.Skill}>
                    <SkillTag
                      title={sk.Skill}
                      onClick={handleSkillSelect}
                      selected={form.skills.includes(sk.Skill)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
            <Stack>
              <Typography variant="s16w6c400">Soft Skills</Typography>
              <Grid mt={2} container spacing={1}>
                {getFilteredSkills("SoftSkill").map((sk) => (
                  <Grid item key={sk.Skill}>
                    <SkillTag
                      title={sk.Skill}
                      onClick={handleSkillSelect}
                      selected={form.skills.includes(sk.Skill)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default SelectSkillsDrawer;
