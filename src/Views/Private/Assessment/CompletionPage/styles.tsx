import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  completion_page_container: {
    width: "70vw",
    margin: "auto",
  },
  completion_image_container: {
    marginTop: "20px",
    height: "50vh",
  },
  completion_image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  nextSteps: {
    border: "2px solid grey",
    padding: "10px 20px",
    borderRadius: 0,
  },
  timer: {
    display: "flex",
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#858585",
  },
  chartContainer: {
    minWidth: "50vw",
    height: "50vh",
    // maxWidth: "100vw",
    [theme.breakpoints.down("md")]: {
      width: "90vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "99vw",
      minHeight: "50vh",
    },
  },
  reportMessage: {
    fontSize: 15,
    fontWeight: 600,
    color: "#4f4f49",
    [theme.breakpoints.down("sm")]: {
      fontWeight: 500,
      fontSize: 10,
    },
  },
}));
