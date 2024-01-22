import {
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAppSelector } from "../../../../App/hooks";
import { useState } from "react";
import CloseWarning from "./CloseWarning";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../../Store/action-types";
import Timer from "./Timer";
import { Menu } from "@mui/icons-material";
const Header = () => {
  const dispatch = useDispatch();
  const { assessmentLib, questions } = useAppSelector(
    (state) => state.assessment_app
  );
  const [openCloseWarning, setOpenCloseWarning] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  function get_answered_percentage() {
    const totalQuestions = questions.length;
    let answered = 0;
    let skipped = 0;
    for (let i = 0; i < totalQuestions; i++) {
      questions[i].isAnswered && answered++;
      questions[i].isSkipped && skipped++;
    }
    const percent = (answered / totalQuestions) * 100;
    return {
      answered: answered,
      skipped: skipped,
      percentAnswered: Number(percent.toFixed(0)),
      totalQuestions: totalQuestions,
    };
  }

  function handleDrawerOpen() {
    dispatch({ type: ActionType.OPEN_ASSESSMENT_DRAWER });
  }
  return (
    <Stack>
      <CloseWarning
        open={openCloseWarning}
        setOpen={setOpenCloseWarning}
      />
      <Stack
        px={4}
        height={88}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
        >
          {isSmallScreen ? (
            <IconButton onClick={handleDrawerOpen}>
              <Menu />
            </IconButton>
          ) : (
            <IconButton onClick={() => setOpenCloseWarning(true)}>
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M21.0406 2.37508C21.4311 1.98455 21.4311 1.35139 21.0406 0.960862C20.65 0.570338 20.0169 0.570338 19.6263 0.960862L11.0001 9.58711L2.37385 0.960866C1.98333 0.570342 1.35017 0.570342 0.959641 0.960866C0.569117 1.35139 0.569117 1.98456 0.959641 2.37508L9.58588 11.0013L0.959677 19.6275C0.569153 20.0181 0.569153 20.6512 0.959677 21.0417C1.3502 21.4323 1.98337 21.4323 2.37389 21.0417L11.0001 12.4155L19.6263 21.0417C20.0168 21.4323 20.65 21.4323 21.0405 21.0417C21.431 20.6512 21.431 20.0181 21.0405 19.6275L12.4143 11.0013L21.0406 2.37508Z"
                    fill="#667085"
                  />
                </svg>
              </SvgIcon>
            </IconButton>
          )}
          {!isSmallScreen && (
            <Typography variant="s20w6c800">{assessmentLib.name}</Typography>
          )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
        >
          <Stack
            width={200}
            alignItems="center"
            spacing={1}
          >
            {isSmallScreen && <Timer isSmall={true} />}
            {/* <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="s12w4c500">{get_answered_percentage().answered} Answered</Typography>
              <Typography variant="s12w4c500">{get_answered_percentage().skipped} Skipped</Typography>
            </Stack> */}
            <Stack width="100%">
              <LinearProgress
                color="success"
                sx={{
                  height: 12,
                  borderRadius: 1,
                }}
                variant="determinate"
                value={get_answered_percentage().percentAnswered}
              />
            </Stack>
            <Typography variant="s12w4c500">
              {get_answered_percentage().percentAnswered}% Completed
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
    </Stack>
  );
};

export default Header;
