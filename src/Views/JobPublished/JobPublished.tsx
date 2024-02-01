import {
  Avatar,
  Button,
  Divider,
  Grid,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Check from "./Check.svg";
import patternRight from "../../../assets/SVGs/patter1.svg";
import { card_styles } from "../../Public/CreateAssessment/steps/SelectDuration";
import { LoadingButton } from "@mui/lab";

const invites = [
  {
    name: "Akash Singh",
    email: "askhs.sigh@gmail.com",
  },
  {
    name: "Jack singer",
    email: "askhs.sigh@gmail.com",
  },
  {
    name: "Ram jesh to",
    email: "askhs.sigh@gmail.com",
  },
  {
    name: "Jack Pinto",
    email: "askhs.sigh@gmail.com",
  },
  {
    name: "Jack Pinto",
    email: "askhs.sigh@gmail.com",
  },
  {
    name: "Jack Pinto",
    email: "askhs.sigh@gmail.com",
  },
  {
    name: "Jack Pinto",
    email: "askhs.sigh@gmail.com",
  },
  {
    name: "Jack Pinto",
    email: "askhs.sigh@gmail.com",
  },
];
const JobPublished = () => {
  return (
    <Stack>
      <Grid
        sx={{ width: "calc(100vw - 70px)" }}
        container
      >
        <Grid
          item
          xs={0}
          md={5}
        >
          <Stack
            spacing={3}
            sx={{
              background: "#3C5988",
              backgroundImage: `url(${patternRight})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
            }}
            height="100vh"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={Check}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <Typography
              variant="s16w6c400"
              color="#fff"
            >
              Congratulations
            </Typography>
            <Typography
              variant="s36w8c500"
              fontWeight={700}
              color="#fff"
            >
              Your new Assessment has been published!
            </Typography>
            <Button variant="contained">Go to my Assessments</Button>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
        >
          <Stack
            height="100vh"
            alignItems="center"
            justifyContent="center"
          >
            <Stack spacing={4}>
              <Stack sx={card_styles}>
                <Stack spacing={3}>
                  <Stack>
                    <Typography variant="s24w6c900">
                      Invite Candidates
                    </Typography>
                    <Typography variant="s14w5c400">
                      Invite candidates to take the Published Assessment.
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <OutlinedInput
                      placeholder="Email, comma seperated"
                      size="small"
                      fullWidth
                    />
                    <LoadingButton variant="contained">
                      Send Mail{" "}
                    </LoadingButton>
                  </Stack>
                  <Stack spacing={3}>
                    <Typography variant="s18w6c700">Sent Mails</Typography>
                    <Stack
                      sx={{ maxHeight: 300, overflowY: "auto" }}
                      divider={<Divider />}
                    >
                      {invites.map((inv) => (
                        <Stack
                          key={inv.name}
                          py={2}
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Avatar sx={{ height: 42, width: 42 }}>
                              {" "}
                              {inv.name[0].toUpperCase()}{" "}
                            </Avatar>
                            <Stack>
                              <Typography
                                variant="s14w5c500"
                                color="text.600"
                              >
                                {" "}
                                {inv.name}{" "}
                              </Typography>
                              <Typography variant="s12w4c500">
                                {" "}
                                {inv.email}{" "}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack
                            sx={{
                              borderRadius: 7,
                              padding: "8px 16px",
                              border: "1px solid #32D583",
                              backgroundColor: "#D1FADF",
                            }}
                          >
                            <Typography
                              variant="s12w5c400"
                              color="#039855"
                            >
                              Sent
                            </Typography>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack sx={card_styles}>
                <Stack spacing={3}>
                  <Typography variant="s24w6c900">Share Assessment</Typography>
                  <Stack
                    sx={{
                      backgroundColor: "#F2F4F7",
                      borderRadius: 2,
                      height: 44,
                    }}
                    px={2}
                    direction="row"
                    alignItems="center"
                    justifyContent={"space-between"}
                  >
                    <Typography variant="s16w5c500">
                      www.zapilio.com/sharer/sharer.php?u=gfhhydj23
                    </Typography>
                    <Link
                      component={"button"}
                      underline="hover"
                    >
                      <Typography
                        variant="s14w5c400"
                        fontWeight={600}
                        color="#FB6514"
                      >
                        {" "}
                        Copy
                      </Typography>
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default JobPublished;
