import { Grid, Stack, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SkillChart = ({
  COLORS,
  skills,
}: {
  COLORS: string[];
  skills: { name: string; questions: number }[];
}) => {
  return (
    <Grid sx={{ position: "relative" }}>
      <Stack
        alignItems="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          variant="s18w4c600"
          fontWeight={500}
          color="text.700"
        >
          Min. 40 Mins
        </Typography>
        <Typography
          variant="s12w5c600"
          color="text.800"
        >
          30m 26s avg
        </Typography>
      </Stack>
      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <PieChart>
          <Pie
            data={skills}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            dataKey="questions"
          >
            {skills.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Grid>
  );
};

export default SkillChart;
