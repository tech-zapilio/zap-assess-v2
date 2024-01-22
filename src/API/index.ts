import axios, { AxiosError } from "axios";
import { AnswerResponse } from "../Types/assessment-app-types";
import { config } from "./constant";
const baseURL = config();
const API = axios.create({
  baseURL: `${baseURL}api`,
});

type EventParams = {
  eventId: string;
  eventCode?: string;
  userInfo?: string;
};

API.interceptors.request.use((req) => {
  // if (sessionStorage.getItem("applicant")) {
  //   req.headers.Authorization = `Bearer ${
  //     JSON.parse(sessionStorage.getItem("applicant")).authToken
  //   }`;
  // }
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

//ASSESSMENT APP
export const start_assessment = (id: string) =>
  API.post(`/assessment/publish/${id}`);
export const get_first_question = (userAssessmentId: string) =>
  API.post("/assessment/next-question", { userAssessmentId });
export const submit_answer = (form: AnswerResponse) =>
  API.post("/assessment/submit-answer", form);
