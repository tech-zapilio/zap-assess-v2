import { Stack, Typography, useTheme } from "@mui/material";
import Tick from "../../../../assets/SVGs/Tick.svg";

const SkillTag = ({
  title = "",
  selected = false,
  onClick = (s: string) => {
    console.log(s);
  },
}: {
  title: string;
  selected: boolean;
  onClick?: (s: string) => void;
}) => {
  const theme = useTheme();
  return (
    <Stack
      onClick={() => onClick(title)}
      direction="row"
      alignItems="center"
      p={2}
      spacing={1}
      sx={{
        cursor: "pointer",
        borderRadius: 9,
        border: `1px solid ${
          selected ? theme.palette.primary.main : theme.palette.grey[200]
        } `,
        backgroundColor: `${selected ? "#FFF6ED" : "#fff"}`,
      }}
    >
      <Typography variant="s12w5c700">{title}</Typography>
      {selected && (
        <img
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          src={Tick}
          alt="check"
        />
      )}
    </Stack>
  );
};

export default SkillTag;
