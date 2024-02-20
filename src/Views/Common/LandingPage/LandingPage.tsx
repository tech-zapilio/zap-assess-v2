import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as API from "../../../API/index";
import sideImage from "./sideImage.svg";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../Store/action-types";
import { EventDetails } from "../../../Types/app-types";

const LandingPage = () => {
  const [form, setForm] = useState<{
    accessCode: string;
    email: string;
    name: string;
  }>({
    accessCode: "0",
    email: "",
    name: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicant = params.applicant || "";
  const code = params.code || "";
  const event = params.event || "";
  const source = params.source || "";

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
        console.log("data", data.data, data.applicant.job.screeningQ);
        // if (data.applicant.job.screeningQ.length == 0)
          navigate("/assessment-details");
        // else navigate("/assessment-screening-questions");

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
        source: source,
        name: form.name,
      });
      if (data) {
        console.log("data", data.data, data.applicant.job.screeningQ);

        dispatch({ type: ActionType.VERIFY_CANDIDATE, payload: data });
        sessionStorage.setItem("applicant", JSON.stringify(data));
        // if (data.applicant.job.screeningQ.length == 0)
          navigate("/assessment-details");
        // else navigate("/assessment-screening-questions");
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
    <Box
      sx={{
        backgroundColor: "#ff0000",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cdefs%3E%3CradialGradient id='a' cx='500' cy='500' r='66.9%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ff0000'/%3E%3Cstop offset='1' stop-color='%23993C3C'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='500' cy='500' r='43.8%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23FF0' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%23FF0' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1000' height='1000'/%3E%3Cg fill='none' stroke='%23FFEA8C' stroke-width='2.6' stroke-miterlimit='10' stroke-opacity='0.38'%3E%3Ccircle cx='500' cy='500' r='725'/%3E%3Ccircle cx='500' cy='500' r='700'/%3E%3Ccircle cx='500' cy='500' r='675'/%3E%3Ccircle cx='500' cy='500' r='650'/%3E%3Ccircle cx='500' cy='500' r='625'/%3E%3Ccircle cx='500' cy='500' r='600'/%3E%3Ccircle cx='500' cy='500' r='575'/%3E%3Ccircle cx='500' cy='500' r='550'/%3E%3Ccircle cx='500' cy='500' r='525'/%3E%3Ccircle cx='500' cy='500' r='500'/%3E%3Ccircle cx='500' cy='500' r='475'/%3E%3Ccircle cx='500' cy='500' r='450'/%3E%3Ccircle cx='500' cy='500' r='425'/%3E%3Ccircle cx='500' cy='500' r='400'/%3E%3Ccircle cx='500' cy='500' r='375'/%3E%3Ccircle cx='500' cy='500' r='350'/%3E%3Ccircle cx='500' cy='500' r='325'/%3E%3Ccircle cx='500' cy='500' r='300'/%3E%3Ccircle cx='500' cy='500' r='275'/%3E%3Ccircle cx='500' cy='500' r='250'/%3E%3Ccircle cx='500' cy='500' r='225'/%3E%3Ccircle cx='500' cy='500' r='200'/%3E%3Ccircle cx='500' cy='500' r='175'/%3E%3Ccircle cx='500' cy='500' r='150'/%3E%3Ccircle cx='500' cy='500' r='125'/%3E%3Ccircle cx='500' cy='500' r='100'/%3E%3Ccircle cx='500' cy='500' r='75'/%3E%3Ccircle cx='500' cy='500' r='50'/%3E%3Ccircle cx='500' cy='500' r='25'/%3E%3C/g%3E%3Crect fill-opacity='0.38' fill='url(%23b)' width='1000' height='1000'/%3E %3C/svg%3E")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={0} md={6}>
            <Stack alignItems="center">
              <Stack width="90%">
                <img
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  src={sideImage}
                  alt="image"
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack mx={4} spacing={2} p={2}>
              <Paper variant="outlined" sx={{ borderRadius: "12px" }}>
                {eventDetails.assessment && (
                  <Stack alignItems="center" py={2} textAlign="center">
                    <Stack height={60}>
                      <img
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                        src={eventDetails.customer.logoURL}
                      />
                    </Stack>
                    <Typography variant="s16w6c500">
                      {" "}
                      {eventDetails.shortDesc.split("(")[0]}
                    </Typography>
                  </Stack>
                )}
                <Stack spacing={2} p={2}>
                  <TextField
                    disabled={loading}
                    variant="standard"
                    label="Name"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    value={form.name}
                    name="name"
                  />
                  <TextField
                    variant="standard"
                    disabled={loading}
                    placeholder="Enter your email"
                    label="Email"
                    onChange={handleChange}
                    value={form.email}
                    name="email"
                  />
                  <TextField
                    variant="standard"
                    disabled={loading}
                    label="Access Code"
                    placeholder="Enter the access code provided"
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
      </Container>
    </Box>
  );
};

export default LandingPage;
