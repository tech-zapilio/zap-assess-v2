import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import useStyles from "./styles";
import { useTranslation } from "react-i18next";
import "../../translations/en/translations";
import { EditorState, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import FooterSmall from "../../components/footer/FooterSmall";
import { useNavigate } from "react-router-dom";
const Completion = ({ Answered, totalQuestions }) => {
  const classes = useStyles();
  const jobProfile = JSON.parse(sessionStorage.getItem("applicant"));
  const nextSteps = jobProfile?.applicant?.job?.nextSteps;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const image = "https://images.zapilio.com/app/assess/applicantThankingPage.svg";

  useEffect(() => {
    if (jobProfile?.applicant?.job?.bDisplayReport) {
      navigate("/report");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (nextSteps) {
      const contentState = convertFromRaw(JSON.parse(nextSteps));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [nextSteps]);

  return (
    <Box container>
      <Grid container className={classes.completion_page_container}>
        <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.completion_image_container}>
          <img className={classes.completion_image} src={image} alt="complete" />
        </Grid>
        <Grid container direction="column" textAlign="center">
          <Typography mb={1} variant="h5" fontWeight="bold" color="Text.Subs">
            {t("CP_submitted")}
          </Typography>
          <Typography mb={1} color="Text.Caps" fontWeight="medium" variant="caption" sx={{ fontSize: "20px" }}>
            {Answered} {t("CP_answered")}
          </Typography>
          <Typography mb={2} color="Text.Caps" fontWeight="medium" variant="body2" sx={{ fontSize: "20px" }}>
            {totalQuestions - Answered} {t("CP_unanswered")}
          </Typography>
          {/* <Box className={classes.timer}>
            <TimerOutlinedIcon fontSize="large" />
            <Typography fontWeight="medium" variant="h6" ml={1}>
              <Timer />
            </Typography>
          </Box> */}
          <Typography color="Text.Subs" fontWeight="medium" mt={4}>
            {t("CP_exit")}
            <br />
            <br />
          </Typography>
        </Grid>
      </Grid>
      {nextSteps ? (
        <div align="center" dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState?.getCurrentContent())) }} />
      ) : (
        <div align="center">
          You are automatically enrolled to our skilling portal. <br />
          You will shortly recieve an email to activate your account.
        </div>
      )}
      <FooterSmall />
    </Box>
  );
};

export default Completion;
