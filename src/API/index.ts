import axios from "axios";
import { AnswerResponse } from "../Types/assessment-app-types";
import { config } from "./constant";
import { GetAssessmentData } from "../Types/app-types";
const baseURL = config("local");
const API = axios.create({
  baseURL: `${baseURL}v3`,
});

type EventParams = {
  eventId: string;
  eventCode?: string;
  source?: string;
  userInfo?: string;
  name?: string;
};

function getAuthToken() {
  const serial = sessionStorage.getItem("applicant") || "";
  let applicant: GetAssessmentData = {} as GetAssessmentData;
  if (serial) {
    applicant = JSON.parse(serial);
    return applicant.authToken;
  }
  return "";
}

API.interceptors.request.use((req) => {
  const token = getAuthToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  req.headers["ngrok-skip-browser-warning"] = true;
  return req;
});

export const get_assessment_for_applicant = ({
  applicantId,
  accessCode,
}: {
  applicantId: string;
  accessCode: string;
}) =>
  API.get(
    `/assess/getAssessment?applicant=${applicantId}&accessCode=${accessCode}`
  );
export const get_assessment_for_event = (form: EventParams) =>
  API.get(`/assess/getAssessmentForEvent`, { params: form });

//ASSESSMENT DETAILS
export const get_assessment_lib = (id: string) => {
  API.get(`/package/${id}`);
};
//ASSESSMENT APP
export const start_assessment = (id: string) =>
  API.post(`/assessment/publish/${id}`);
export const get_first_question = () => API.get("/assess/getNextQuestion");
export const submit_answer = (form: AnswerResponse) =>
  API.post("/assess/postResponse", form);
