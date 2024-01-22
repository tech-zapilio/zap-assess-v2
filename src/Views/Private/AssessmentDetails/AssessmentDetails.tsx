import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

const JobData = {
  logo: "",
  name: "ABC Incoporated",
};
const card_styles = {
  boxShadow:
    "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
  borderRadius: 5,
  padding: 3,
  backgroundColor: "#fff",
};
const instructions = [
  {
    title: "Step 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Step 2",
    desc: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Step 3",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    title: "Step 4",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
  },
];

const AssessmentDetails = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Stack>
            <Container maxWidth="sm">
              <Stack
                sx={{ height: "100vh" }}
                justifyContent="center"
                spacing={4}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ color: "#fd5400" }}>ABC</Typography>
                  <Stack>
                    <Typography variant="s12w4c500"> Assessment By </Typography>
                    <Typography variant="s16w6c500">{JobData.name}</Typography>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography variant="s36w8c500" color="text.900">
                    User Experience Designer
                  </Typography>
                  <Typography variant="s18w4c500" fontWeight={500}>
                    The User Experience Designer package assesses a candidate's
                    skills in User Experience Design and their ability to plan,
                    research, design, and create delightful user experiences in
                    products.
                  </Typography>
                </Stack>
                <Stack>
                  <Button size="large" variant="contained">
                    Start Assessment
                  </Button>
                </Stack>
              </Stack>
            </Container>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            sx={{ height: "100vh", backgroundColor: "#eaecf0" }}
            justifyContent="center"
          >
            <Container maxWidth="sm">
              <Stack spacing={4}>
                <Stack>
                  <Typography variant="s18w6c700">Test Instructions</Typography>
                  <Typography variant="s12w4c500" color="text.800">
                    {" "}
                    40 Questions | 30 Minutes
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {instructions.map((ins, index) => (
                    <Stack sx={card_styles} spacing={1}>
                      <Typography variant="s20w6c700">{ins.title}</Typography>
                      <Typography variant="s12w4c500">{ins.desc}</Typography>
                      <Typography>fasf</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Container>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssessmentDetails;
