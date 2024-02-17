import { Grid, Typography, Stack, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AreaChart from "../../../../components/graphs/AreaChart";
import { LoadingButton } from "@mui/lab";
import PieChart from "../../../../components/graphs/PieChart";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Loading from "../../../../components/Loading/Loading";
import BarGraph from "../../../../components/graphs/BarGraph";
import useStyles from "./styles";
import { useAppSelector } from "../../../../App/hooks";
import { useNavigate } from "react-router-dom";
import { EditorState, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { getReport } from "../../../../API";
import { ActionType } from "../../../../Store/action-types";
const GraphReport = () => {
  const navigate = useNavigate();

  const { applicant } = useAppSelector(
    (state) => state?.assessment_app.verifyCandidateResponse
  );
  // const notAllowed = applicant?.applicant?.customer?.product !== "SkillPro";
  const { report } = useAppSelector((state) => state.assessment_app);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    const callAPI = async () => {
      try {
        setLoading(true);
        const { data } = await getReport();

        if (data) {
          dispatch({ type: ActionType.GET_REPORT, payload: data });

          setLoading(false);
        }

        // const {data} = await
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    callAPI();
    // if (!notAllowed) {
    // dispatch(getReport(setLoading));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mailing) {
      setInterval(function () {
        setMailing(false);
        setMessage(true);
      }, 1500);
    }
  }, [mailing]);

  // useEffect(() => {
  //   if (applicant?.applicant?.job?.nextSteps) {
  //     const contentState = convertFromRaw(
  //       JSON.parse(applicant?.applicant?.job?.nextSteps)
  //     );
  //     setEditorState(EditorState.createWithContent(contentState));
  //   }
  // }, [applicant]);

  return (
    <Grid textAlign="center">
      {/* {notAllowed ? (
        <Typography variant="title1">{t("GraphReportNot")}</Typography>
      ) : ( */}
      <Grid>
        {loading ? (
          <Loading />
        ) : (
          <Grid
            sx={{ height: "100vh" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
          >
            <Grid>
              <Grid mb={1}>
                <Typography
                  color="primary"
                  sx={{ fontSize: 35, fontWeight: 600 }}
                >
                  Congratulations
                </Typography>
              </Grid>
              {/* <Typography variant="title2">
                {t("report_completed")} {applicant?.applicant?.assessment?.name}{" "}
                {t("report_assessment")}
              </Typography> */}
              <Typography variant="s18w6c700">
                You have successfully completed the{" "}
                {applicant.job.shortDesc.split("(")[0]}
              </Typography>

              <Grid>
                <Typography variant="s18w4c600">
                  And this is how you fared against your peers.
                </Typography>

                {/* <Typography variant="title2thin" color="Text.Subs">
                  {t("report_and")}
                </Typography> */}
              </Grid>
            </Grid>
            <Grid
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid className={classes.chartContainer}>
                {report?.chartType === "Bar" && (
                  <BarGraph data={report?.data} />
                )}
                {report?.chartType === "pie" && (
                  <PieChart data={report?.data} />
                )}
                {report?.chartType === "area" && (
                  <AreaChart data={report?.data} />
                )}
              </Grid>
              {/* <Grid mt={4}>
                {message ? (
                  <Typography className={classes.reportMessage}>
                    {" "}
                    {t("report_sent")}
                  </Typography>
                ) : (
                  <LoadingButton
                    onClick={() => setMailing(true)}
                    loading={mailing}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                    disableElevation
                  >
                    {t("report_email")}
                  </LoadingButton>
                )}
              </Grid> */}
              {/* <Grid my={1} mb={10}>
                  
                </Grid> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(
                    convertToRaw(editorState?.getCurrentContent())
                  ),
                }}
              />
            </Grid>
            <Stack
              gap={3}
              alignItems="center"
              justifyContent="space-between"
              // height="100vh"
              direction={"row"}
            >
              {/* <Button onClick={() => navigate("/report")} variant="outlined">
              View Graphical Report
            </Button> */}
              <Button onClick={() => navigate("/")} variant="outlined">
                Go Home
              </Button>
            </Stack>

            {/* <FooterSmall /> */}
          </Grid>
        )}
      </Grid>
      {/* )} */}
    </Grid>
  );
};

export default GraphReport;
