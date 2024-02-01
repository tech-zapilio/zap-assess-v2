import { Avatar, Stack, Typography, useTheme } from "@mui/material";

const LevelCard = ({
  level,
  onClick,
  selected,
}: {
  level: {
    label: string;
    value: string;
    description: string;
    svg: string;
  };
  selected: boolean;
  onClick: (l: string) => void;
}) => {
  const theme = useTheme();
  return (
    <Stack
      onClick={() => onClick(level.value)}
      px={2}
      py={2.5}
      sx={{
        border: `1px solid ${
          selected ? theme.palette.primary.main : theme.palette.grey[200]
        }`,
        backgroundColor: `${selected ? "#FFF6ED" : "#fff"}`,

        cursor: "pointer",
        borderRadius: 2,
      }}
      direction="row"
      alignItems="flex-start"
      spacing={1.5}
    >
      <Avatar
        alt={level.label}
        src={level.svg}
      ></Avatar>
      <Stack spacing={1}>
        <Typography variant="s16w6c800"> {level.label} </Typography>
        <Typography variant="s12w4c600"> {level.description} </Typography>
      </Stack>
    </Stack>
  );
};

export default LevelCard;
