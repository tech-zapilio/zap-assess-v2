import { Box, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as API from "../../../API/index";
import sideImage from "./sideImage.svg";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../Store/action-types";
import { EventDetails } from "../../../Types/app-types";

const LandingPage = () => {
  const [form, setForm] = useState<{ accessCode: string; email: string }>({
    accessCode: "0",
    email: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicant = params.applicant || "";
  const code = params.code || "";
  const event = params.event || "";

  //https://dev.assess2.zapilio.com/applicantId=659fca4e1bfefcbd2444e00e/accessCode=170042.
  //jodId:659e6a6c04b1ff2667468687 ,code: 126578,
  //http://localhost:5173/event/659e6a6c04b1ff2667468687/126578
  const [eventDetails, setEventDetails] = useState<EventDetails>(
    {} as EventDetails
  );
  const [loading, setLoading] = useState(false);
  async function getAssessmentForApplicant() {
    try {
      setLoading(true);
      const { data } = await API.get_assessment_for_applicant({
        applicantId: applicant,
        accessCode: code,
      });

      if (data) {
        dispatch({ type: ActionType.VERIFY_CANDIDATE, payload: data });
        sessionStorage.setItem("applicant", JSON.stringify(data));
        navigate("/assessment-details");
        setLoading(false);
      }

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
      if (data) {
        dispatch({ type: ActionType.VERIFY_CANDIDATE, payload: data });
        sessionStorage.setItem("applicant", JSON.stringify(data));
        navigate("/assessment-details");
      }

      setLoading(false);

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
      setEventDetails(data.event);
      setLoading(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        justifyContent="center">
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
              {eventDetails.assessment && (
                <Stack alignItems="center" py={2}>
                  <Stack height={80}>
                    <img
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                      src={eventDetails.customer.logoURL}
                    />
                  </Stack>
                  <Typography>{eventDetails.shortDesc}</Typography>
                </Stack>
              )}
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
                  variant="contained">
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
