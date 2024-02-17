import { GetAssessmentData } from "../../Types/app-types";
import { QuestionIndex } from "../../Types/assessment-app-types";
import { AssessmentDetails } from "../../Types/child-types";
import { ActionType } from "../action-types";

interface VerifyCandidate {
  type: ActionType.VERIFY_CANDIDATE;
  payload: GetAssessmentData;
}
interface StartAssessment {
  type: ActionType.START_ASSESSMENT;
  payload: {
    userAssessmentId: string;
    assessmentLib: AssessmentDetails;
  };
}

interface EndAssessment {
  type: ActionType.END_ASSESSMENT;
  payload: null;
}
interface ClearPrevAssessment {
  type: ActionType.CLEAR_PREV_ASSESSMENT;
  payload: null;
}

interface GetQuestion {
  type: ActionType.GET_QUESTION;
  payload: QuestionIndex;
}

interface LoadQuestion {
  type: ActionType.LOAD_QUESTION;
  payload: QuestionIndex;
}
interface UpdateAnswer {
  type: ActionType.UPDATE_ANSWER;
  payload: string;
}
interface UpdateAnswerSQ {
  type: ActionType.UPDATE_ANSWER_SQ;
  payload: {
    currentQNumber: number;
    answers: {
      question: string;
      answer: string;
    }[];
  };
}
interface SubmitAnswerSQ {
  type: ActionType.SUBMIT_ANSWER_SQ;
  payload: null;
}

interface SubmitAnswer {
  type: ActionType.SUBMIT_ANSWER;
  payload: QuestionIndex;
}

interface StartQuestionLoading {
  type: ActionType.START_QUESTION_LOADING;
  payload: null;
}
interface EndQuestionLoading {
  type: ActionType.END_QUESTION_LOADING;
  payload: null;
}
interface UpdateQuestionStatus {
  type: ActionType.UPDATE_QUESTION_STATUS;
  payload: QuestionIndex;
}
interface ShowReview {
  type: ActionType.SHOW_REVIEW;
  payload: null;
}
interface HideReview {
  type: ActionType.HIDE_REVIEW;
  payload: null;
}
interface SetCompleted {
  type: ActionType.SET_COMPLETED;
  payload: null;
}
interface IsAnswerSkipped {
  type: ActionType.ANSWER_SKIPPING;
  payload: null;
}
interface LoadQuestionByIndex {
  type: ActionType.LOAD_QUESTION_BY_INDEX;
  payload: number;
}
interface UpdateTimeElapsed {
  type: ActionType.UPDATE_TIME_ELAPSED;
  payload: string;
}
interface OpenAssessmentDrawer {
  type: ActionType.OPEN_ASSESSMENT_DRAWER;
  payload: string;
}
interface CloseAssessmentDrawer {
  type: ActionType.CLOSE_ASSESSMENT_DRAWER;
  payload: string;
}
interface updateCurrentSQ {
  type: ActionType.UPDATE_CURRENT_SQ;
  payload: {
    question: string;
    answer: string;
  };
}
interface getReport {
  type: ActionType.GET_REPORT;
  payload: any;
}

export type AssessmentAppActions =
  | StartAssessment
  | EndAssessment
  | GetQuestion
  | LoadQuestion
  | UpdateAnswer
  | SubmitAnswer
  | StartQuestionLoading
  | EndQuestionLoading
  | UpdateQuestionStatus
  | ShowReview
  | HideReview
  | SetCompleted
  | IsAnswerSkipped
  | LoadQuestionByIndex
  | UpdateTimeElapsed
  | OpenAssessmentDrawer
  | CloseAssessmentDrawer
  | VerifyCandidate
  | ClearPrevAssessment
  | UpdateAnswerSQ
  | SubmitAnswerSQ
  | updateCurrentSQ
  | getReport;
