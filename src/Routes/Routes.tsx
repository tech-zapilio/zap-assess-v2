import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import NotFoundPage from "../Views/Common/NotFoundPage/NotFoundPage";
import Assessment from "../Views/Private/Assessment/Assessment";
import Completed from "../Views/Private/Assessment/Completed";
import AssessmentDetails from "../Views/Private/AssessmentDetails/AssessmentDetails";
import LandingPage from "../Views/Common/LandingPage/LandingPage";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="/" element={<LandingPage />} />
        <Route path="applicant/:applicant/:code" element={<LandingPage />} />
        <Route path="event/:event/:code" element={<LandingPage />} />

        {/* src */}
      </Route>
      <Route element={<AssessmentRoutes />}>
        <Route path="/assessment-app" element={<Assessment />} />
        <Route path="/assessment-details" element={<AssessmentDetails />} />
        <Route path="/assessment-completed" element={<Completed />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

const AssessmentRoutes = () => {
  const token = "dd";

  return <>{!token ? <Navigate replace to="/" /> : <Outlet />}</>;
};
