import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SkillChart from "../children/PieChart";
import { bestFor, skills } from "../../../../json/assessment-levels";
import TextEditor from "../../../../Components/TextEditor/TextEditor";

const tabs = [
  {
    label: "Skill Overview",
    value: "overview",
  },
  {
    label: "Custom Message",
    value: "message",
  },
];

const ReviewTabs = ({ tab, setTab }: { tab: string; setTab: any }) => {
  return (
    <Stack width="100%">
      <Stack
        direction="row"
        alignItems="center"
      >
        {tabs.map((t) => (
          <Stack
            py={1.8}
            onClick={() => setTab(t.value)}
            width="50%"
            alignItems="center"
            sx={{
              cursor: "pointer",
              borderBottom: `3px solid ${t.value === tab ? "#fd5400" : "#fff"}`,
            }}
          >
            <Typography
              variant="s16w6c400"
              color={t.value === tab ? "text.900" : "text.500"}
            >
              {t.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Divider />
    </Stack>
  );
};

const SkillOverview = () => {
  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
        md={6}
      >
        <SkillChart
          COLORS={COLORS}
          skills={skills}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <Stack>
          <Stack
            mt={4}
            spacing={2}
          >
            {skills.map((sk, i) => (
              <Stack key={sk._id}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                >
                  <Stack
                    height={48}
                    width={48}
                    sx={{
                      borderRadius: "50%",
                      backgroundColor: COLORS[i],
                      p: 1,
                    }}
                  >
                    <img
                      src={sk.image}
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </Stack>
                  <Stack>
                    <Typography
                      variant="s16w6c400"
                      color="text.700"
                    >
                      {sk.name}
                    </Typography>
                    <Typography variant="s12w5c500">
                      {sk.questions} Questions
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

const CustomMessage = () => {
  return <Grid>one</Grid>;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AssessmentDetails = () => {
  return (
    <Stack spacing={5}>
      <Typography
        variant="s14w4c400"
        color="text.700"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        molestiae reprehenderit quidem reiciendis harum. Ducimus odio veritatis
        architecto ullam consequatur autem explicabo? Ipsam eaque est voluptate
        voluptatum iste accusamus, consectetur natus explicabo eos non unde
        dolorum numquam facere aliquid ut voluptatibus cupiditate ab alias error
        veritatis quis fuga. Hic accusantium quidem, illo quod sit
        necessitatibus nemo sed, similique ipsa at, id ex! Molestiae fugit ad
        dolorum tenetur, perferendis libero unde nobis incidunt recusandae,
      </Typography>
      <Stack spacing={2}>
        <Typography variant="s16w6c400">Best For</Typography>
        <Typography variant="s12w5c700">{bestFor.join(", ")}</Typography>
      </Stack>
    </Stack>
  );
};

const Review = () => {
  const [currentTab, setCurrentTab] = useState<string>("overview");

  return (
    <Container maxWidth="lg">
      <Stack>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <AssessmentDetails />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Stack>
              <ReviewTabs
                setTab={setCurrentTab}
                tab={currentTab}
              />
              <Grid>
                {
                  { overview: <SkillOverview />, message: <TextEditor /> }[
                    currentTab
                  ]
                }
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Review;
