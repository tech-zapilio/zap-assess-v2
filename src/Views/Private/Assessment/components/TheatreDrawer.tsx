import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import TheatreExperience from "./TheatreExperience";
import Timer from "./Timer";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../../Store/action-types";
import { useAppSelector } from "../../../../App/hooks";
import { CloseOutlined } from "@mui/icons-material";
import CloseWarning from "./CloseWarning";
import { useState } from "react";

export default function TheatreDrawer() {
  const dispatch = useDispatch();
  const [openCloseWarning, setOpenCloseWarning] = useState(false);
  const { drawerOpen, assessmentLib } = useAppSelector(
    (state) => state.assessment_app
  );

  function handleClose() {
    dispatch({ type: ActionType.CLOSE_ASSESSMENT_DRAWER });
  }
  return (
    <div>
      <CloseWarning
        open={openCloseWarning}
        setOpen={setOpenCloseWarning}
      />
      <Drawer
        anchor={"left"}
        open={drawerOpen}
        onClose={handleClose}
      >
        <Box sx={{ background: "#fff", height: "100vh", width: 300 }}>
          <Stack
            alignItems="center"
            spacing={2}
          >
            <Stack width="100%">
              <Stack
                p={2}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="s20w6c800">
                  {assessmentLib.name}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseOutlined />
                </IconButton>
              </Stack>
              <Divider />
            </Stack>
            <Stack
              p={2}
              spacing={2}
              alignItems="center"
            >
              <Timer />
              <TheatreExperience />

              <Button
                fullWidth
                variant="contained"
                onClick={() => setOpenCloseWarning(true)}
              >
                Exit Assessment
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
}
