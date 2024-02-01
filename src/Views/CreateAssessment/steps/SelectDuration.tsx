import { Circle } from "@mui/icons-material";
import { Slider, Stack, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { updateAssessmentForm } from "../../../../store/app/app-slice";

const PrettoSlider = styled(Slider)({
  height: 16,
  "& .MuiSlider-track": {
    backgroundColor: "#FB6514",
    border: "none",
    height: 16,
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#ffd400",
  },
  "& .MuiSlider-thumb": {
    height: 34,
    width: 34,
    backgroundColor: "#fff",
    border: "4px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
export const card_styles = {
  boxShadow: "0px 4px 46px -2px rgba(16, 24, 40, 0.08);",
  p: 4.5,
  width: { xs: "80vw", md: 600 },
};

const SelectDuration = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.app.createAssessmentForm);
  function handleDuration(v: number) {
    if (v > 20) {
      dispatch(updateAssessmentForm({ ...form, duration: v }));
    }
  }
  return (
    <Stack alignItems="center">
      <Stack
        sx={card_styles}
        spacing={5.2}
      >
        <Stack>
          <Typography variant="s18w6c700">Assessment Time</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
        >
          <Stack spacing={1}>
            <Typography variant="s12w5c500">Assessment Time</Typography>
            <Typography
              variant="s28w6c800"
              fontWeight={500}
            >
              {form.duration} Mins
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="s12w5c500">Total Question</Typography>
            <Typography
              variant="s28w6c800"
              fontWeight={500}
            >
              36
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <PrettoSlider
              onChange={(_e, v) => handleDuration(v as number)}
              value={form.duration}
              min={0}
              max={60}
            />
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              {[...Array(61).keys()].map((_s, i) => (
                <Stack alignItems="center">
                  <Circle
                    sx={{
                      fontSize: 8,
                      color: i === 0 || i % 15 === 0 ? "#98A2B3" : "#EAECF0",
                    }}
                  />
                  {(i === 0 || i % 15 === 0) && (
                    <Typography variant="s14w5c500">{i}</Typography>
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Stack
                sx={{
                  height: 4,
                  width: 35,
                  backgroundColor: "#FEB273",
                  borderRadius: 2,
                }}
              ></Stack>
              <Stack>
                <Typography
                  variant="s12w5c700"
                  fontWeight={400}
                >
                  {" "}
                  Fixed Assessment Time
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Stack
                sx={{
                  height: 4,
                  width: 35,
                  backgroundColor: "#FB6514",
                  borderRadius: 2,
                }}
              ></Stack>
              <Stack>
                <Typography
                  variant="s12w5c700"
                  fontWeight={400}
                >
                  Added assessment time
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SelectDuration;
