import { Stack, Typography } from "@mui/material";
import { card_styles } from "./SelectDuration";
import StyledSwitch from "../../../../Components/Form/StyledSwitch";
// Forced Full Screen

// Display Graphical Report to applicant
// generate skill  PDF report
// autogenerate and email report to candidate
// download answer report

const settings = [
  {
    label: "Randomize Questions",
    name: "randQ",
  },
  {
    label: "Forced Full Screen",
    name: "fullScreen",
  },
  {
    label: "Display Graphical Report to applicant",
    name: "showReport",
  },
  {
    label: "Generate SKill PDF Report",
    name: "pdfReport",
  },
  {
    label: "Autogenerate and Email Report to candidates",
    name: "reportDelivery",
  },
  {
    label: "Download correct answers report",
    name: "correctAns",
  },
];
const JobSettings = () => {
  return (
    <Stack alignItems="center">
      <Stack
        sx={card_styles}
        spacing={2}
      >
        <Stack>
          <Typography variant="s18w6c700">Job Settings</Typography>
        </Stack>
        <Stack spacing={1}>
          {settings.map((s) => (
            <Stack
              sx={{ ...card_styles, p: 2, width: "100%" }}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <StyledSwitch />
              <Typography variant="s14w6c700">{s.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default JobSettings;
