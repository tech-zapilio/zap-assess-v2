import { CloseOutlined } from "@mui/icons-material";
import {
  Fade,
  Modal,
  IconButton,
  Box,
  Backdrop,
  Typography,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../../Store/action-types";
import { useNavigate } from "react-router-dom";
import BannerIcon from "../../../../Assets/SVGs/exit_assessment.svg";
import { useAppSelector } from "../../../../App/hooks";
import { useState } from "react";
const modalStyles = {
  position: "absolute",
  top: "50%",
  minHeight: 200,
  px: { xs: 3, md: 6 },
  width: { xs: "80vw", md: 700 },
  py: 4,
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  borderRadius: 7.5,
  zIndex: 1,
};

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CloseWarning = (props: ModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { open, setOpen } = props;
  const { verifyCandidateResponse } = useAppSelector(
    (state) => state.assessment_app
  );

  function handleClose() {
    setOpen(false);
  }
  function handleExit() {
    setLoading(true);
    dispatch({ type: ActionType.END_ASSESSMENT });
    // navigate(
    //   `event/${verifyCandidateResponse.applicant.job._id}:${verifyCandidateResponse.applicant.job.jobCode}`
    // );
    window.open("https://www.skill.zapilio.com/", "_self");
  }
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
      sx={{ background: loading ? "rgba(16,24,40,0.8)" : "" }}
    >
      <Fade in={open}>
        <Box sx={modalStyles}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              background: "#fff",
              boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              "&:hover": {
                background: "#fff",
              },
            }}
          >
            <CloseOutlined />
          </IconButton>
          <Stack spacing={3}>
            <Stack
              px={{ xs: 2, md: 9, lg: 9 }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                background: "#F2F4F7",
                borderRadius: 5,
                height: 125,
              }}
            >
              <Typography
                color="#101828"
                variant={isSmallScreen ? "s28w6c800" : "s36w8c500"}
                fontWeight={500}
              >
                You get three attempts{" "}
              </Typography>
              <img
                src={BannerIcon}
                alt="image"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </Stack>
            <Typography mt={2} variant="s16w4c600">
              Stay on course with your assessment. More than two exits mean a
              12-day wait for a retry.{" "}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Button
                variant="outlined"
                onClick={handleClose}
                disabled={loading}
              >
                Go Back
              </Button>{" "}
              <Button
                variant="contained"
                onClick={handleExit}
                disabled={loading}
              >
                Exit Assessment
              </Button>{" "}
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CloseWarning;
