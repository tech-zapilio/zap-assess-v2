import { Box, Container, Link, Stack, Typography } from "@mui/material";
import NotFound from "../../../Assets/SVGs/notFound.svg";

const NotFoundPage = () => {
  return (
    <Box>
      <Container>
        <Stack textAlign="center" height="100vh" justifyContent="center">
          <Stack width="100%" alignItems="center">
            <Stack width="80%">
              <img src={NotFound} alt="not found" />
            </Stack>
            <Typography variant="txt28" color="text.800" fontWeight={500}>
              Page Not Found!
            </Typography>
            <Typography variant="txt20" color="text.400" fontWeight={500}>
              The page you are looking for does not exists.
            </Typography>
            <Link variant="txt20" underline="hover" href="/">
              Back to home
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
