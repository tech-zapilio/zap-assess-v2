import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

type Props = {
  children: string;
  selected: boolean;
  onClick?: () => void;
};

const Option = (props: Props) => {
  const { selected, children, onClick } = props;
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const theme = useTheme();
  return (
    <Stack
      onClick={onClick}
      alignItems="flex-start"
      justifyContent="center"
      sx={{
        cursor: "pointer",
        minHeight: 40,

        borderRadius: 2.5,
        border: "1px solid",
        p: 1,
        px: 2,
        boxShadow: " 0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
        borderColor: selected ? "#fd5400" : theme.palette.grey[300],
        background: selected ? "#FFEAD5" : "#fcfcfd",
      }}
    >
      <Typography
        variant={isSmallScreen ? "s16w6c700" : "s20w6c800"}
        fontWeight={400}
        color={selected ? "#FB6514" : theme.palette.grey[700]}
      >
        {children}
      </Typography>
    </Stack>
  );
};

export default Option;
