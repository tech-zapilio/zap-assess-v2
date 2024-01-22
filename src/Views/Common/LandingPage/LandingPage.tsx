import { Box, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as API from "../../../API/index";
import sideImage from "./sideImage.svg";
import { LoadingButton } from "@mui/lab";

const event_details = {
  _id: "659e6a6c04b1ff2667468687",
  retrySKIP: false,
  bRandQuestion: false,
  bDisplayReport: false,
  isFullScreen: true,
  isSubjectiveEval: false,
  bAllowSkip: true,
  jobCode: "JD0001",
  shortDesc: "Backend Developer (Muhamed.safvan)",
  createdBy: {
    _id: "6571a83c5bb8930478bcf002",
    email: "muhamed.safvan@ipl.edu.in",
  },
  assessment: {
    _id: "659e6a6c04b1ff2667468684",
    totalTime: 17,
    image:
      "https://images.zapilio.com/assessments/custom/_Beginner%20Backend%20Developer.png",
  },
  customer: {
    _id: "6571a83c5bb8930478bcf004",
    name: "Muhamed.safvan",
    logoURL: "https://images.zapilio.com/app/rpt/IPSAT-10.png",
    welcomeVideoURL:
      "https://images.zapilio.com/hp/profile-1666007140141_zapilio.mp4",
    termsConditions:
      '{"blocks":[{"key":"1snfc","text":"This is sample tems","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    customURL: "https://dev.hirezap2.zapilio.com/mu9382",
  },
  accessCode: 126578,
};

const LandingPage = () => {
  const [form, setForm] = useState<{ accessCode: any; email: string }>({
    accessCode: 0,
    email: "",
  });
  const params = useParams();
  const applicant = params.applicant || "";
  const code = params.code || "";
  const event = params.event || "";

  //https://dev.assess2.zapilio.com/applicantId=659fca4e1bfefcbd2444e00e/accessCode=170042.
  //jodId:659e6a6c04b1ff2667468687 ,code: 126578,
  //http://localhost:5173/event/659e6a6c04b1ff2667468687/126578
  const [loading, setLoading] = useState(false);
  async function getAssessmentForApplicant() {
    try {
      setLoading(true);
      const { data } = await API.get_assessment_for_applicant({
        applicantId: applicant,
        accessCode: code,
      });
      setLoading(false);

      console.log(data);
      // const {data} = await
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function getAssessmentForEvent() {
    try {
      setLoading(true);
      const { data } = await API.get_assessment_for_event({
        eventId: event,
        eventCode: form.accessCode,
        userInfo: form.email,
      });
      setLoading(false);

      console.log(data);
      // const {data} = await
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  async function getEventDetails() {
    try {
      setLoading(true);
      const { data } = await API.get_assessment_for_event({
        eventId: event,
      });
      setLoading(false);

      console.log(data);
      // const {data} = await
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (applicant && code) {
      getAssessmentForApplicant();
    }

    if (code) {
      setForm((pf) => ({ ...pf, accessCode: code }));
    }
    if (event) {
      getEventDetails();
    }
  }, []);

  function handleChange(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    getAssessmentForEvent();
  }

  return (
    <Box>
      <Grid
        container
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={0} md={6}>
          <Stack alignItems="center">
            <Stack width="50%">
              <img
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                src={sideImage}
                alt="image"
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack mx={4} spacing={2}>
            <Paper variant="outlined">
              <Stack alignItems="center" py={2}>
                <Stack height={80}>
                  <img
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                    src={event_details.customer.logoURL}
                  />
                </Stack>
                <Typography>{event_details.shortDesc}</Typography>
              </Stack>
              <Stack spacing={2} p={2}>
                <TextField
                  disabled={loading}
                  label="Email"
                  onChange={handleChange}
                  value={form.email}
                  name="email"
                />
                <TextField
                  disabled={loading}
                  label="Access Code"
                  onChange={handleChange}
                  value={form.accessCode}
                  name="accessCode"
                  type="number"
                />
                <LoadingButton
                  onClick={handleSubmit}
                  loading={loading}
                  variant="contained"
                >
                  Proceed
                </LoadingButton>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
