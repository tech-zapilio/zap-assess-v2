import { GetAssessmentData } from "../../Types/app-types";
import {
  Question,
  QuestionIndex,
  QuestionStatus,
} from "../../Types/assessment-app-types";
import { AssessmentDetails } from "../../Types/child-types";
import { ActionType } from "../action-types";
import { Action } from "../actions";
type answer = {
  question: string;
  answer: string;
};
export type AssessmentAppType = {
  //ASSESSMENT
  verifyCandidateResponse: GetAssessmentData;
  userAssessmentId: string;
  assessmentLib: AssessmentDetails;
  questions: QuestionIndex[];
  currentQuestion: QuestionIndex;
  questionLoading: boolean;
  endsOn: number;
  startedOn: number;
  timeElapsed: string;
  allQuestionLoaded: boolean;
  isCompleted: boolean;
  isSkip: boolean;
  isReview: boolean;
  drawerOpen: boolean;
  screeningQuestions: {
    currentQNumber: number;
    answers: {
      question: string;
      answer: string;
    }[];
  };
  currentScreeningAnswer: {
    question: string;
    answer: string;
  };
  report: any;
  openScreeningQuestionsModal: boolean;
};

const initAssessmentState: AssessmentAppType = {
  userAssessmentId: "",
  questionLoading: false,
  timeElapsed: "0:0",
  startedOn: 0,
  allQuestionLoaded: false,
  isSkip: false,
  isReview: false,
  isCompleted: false,
  drawerOpen: false,

  endsOn: 0,
  assessmentLib: {
    _id: "",
    assessmentlibs: "",
    type: "",
    name: "",
    description: "",
    duration: 0,
    questions: 0,
    image: "",
    skills: [],
    instructions: "",
    bestFor: "",
    shortDesc: "",
    isLocked: false,
    level: "",
    isMaster: false,
    updatedAt: "",
  },

  questions: [],
  currentQuestion: {
    answer: "",
    index: 0,
    isAnswered: false,
    isSkipped: false,
    question: {
      _id: "",
      question: "",
      questionType: "",
      code: "",
      options: [],
      skill: "",
      competency: "",
      suggestion: "",
      size: "",
      range: "",
      settings: [],
      isSample: false,
      level: "",
      time: 0,
      isMaster: false,
      assessmentRef: undefined,
      customer: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  },
  verifyCandidateResponse: {
    applicant: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      sentAt: "",
      expiresAt: "",
      status: "",
      stage: "",
      type: "",
      job: {
        _id: "",
        retrySKIP: false,
        bRandQuestion: false,
        bDisplayReport: false,
        isFullScreen: false,
        isSubjectiveEval: false,
        bAllowSkip: false,
        jobCode: "",
        shortDesc: "",
        status: "",
        assessmentLib: {
          _id: "",
          type: "",
          description: "",
        },
        screeningQ: [],
      },
      assessment: {
        _id: "",
        instructions: [],
        totalQuestions: 0,
        totalTime: 0,
        settings: [],
        name: "",
        image: "",
      },
      customer: {
        name: "",
        logoURL: "",
        welcomeVideoURL: "",
        termsConditions: "",
      },
      attempts: 0,
      accessedAt: "",
      updatedAt: "",
    },
    lastAttempt: {
      answered: 0,
      skipped: 0,
      timeElapsed: "",
    },
    customer: {
      name: "",
      logoURL: "",
      welcomeVideoURL: "",
      termsConditions: "",
      registedName:""
    },
    authToken: "",
    mapping: [],
  },
  screeningQuestions: {
    currentQNumber: 0,
    answers: [],
  },
  currentScreeningAnswer: {
    question: "",
    answer: "",
  },
  report: null,
  openScreeningQuestionsModal: false,
};

function initQuestions(no_of_questions: number) {
  const questions: QuestionIndex[] = [];
  for (let i = 1; i <= no_of_questions; i++) {
    questions.push({
      index: i,
      isAnswered: false,
      isSkipped: false,
      answer: "",
      question: {} as Question,
    });
  }

  return questions;
}

function insertQuestion(
  questions: QuestionIndex[],
  newQuestion: QuestionIndex
) {
  const updatedQuestions = questions.map((q) =>
    q.index === newQuestion.index
      ? { ...newQuestion, isAnswered: false, isSkipped: false, answer: "" }
      : q
  );
  return updatedQuestions;
}

//
//

function updated_question_after_submission(
  questions: QuestionIndex[],
  currentQuestion: QuestionIndex,
  submitted_question: QuestionIndex
) {
  const updated_questions = questions.map((q) =>
    q.index === submitted_question.index ? submitted_question : q
  );
  const current_question =
    currentQuestion.index === submitted_question.index
      ? {
          ...currentQuestion,
          isAnswered: submitted_question.isAnswered,
          isSkipped: submitted_question.isSkipped,
        }
      : currentQuestion;
  return { questions: updated_questions, currentQuestion: current_question };
}

//
//
function update_question_status(
  currentQuestion: QuestionIndex,
  questions: QuestionIndex[],
  status: QuestionStatus
) {
  const updated_questions = questions.map((q) =>
    q.index === status.index
      ? { ...q, isAnswered: status.isAnswered, isSkipped: status.isSkipped }
      : q
  );

  const current_question = currentQuestion;
  if (currentQuestion.index === status.index) {
    current_question.isAnswered = status.isAnswered;
    current_question.isSkipped = status.isSkipped;
  }
  return { currentQuestion: current_question, questions: updated_questions };
}

//
//
function get_question_by_index(
  questions: QuestionIndex[],
  questionIndex: number
) {
  return questions.find((q) => q.index === questionIndex) as QuestionIndex;
}
//
//
const assessment_app_reducers = (
  state: AssessmentAppType = initAssessmentState,
  action: Action
): AssessmentAppType => {
  switch (action.type) {
    case ActionType.VERIFY_CANDIDATE:
      return {
        ...state,
        verifyCandidateResponse: action.payload,
      };
    case ActionType.CLEAR_PREV_ASSESSMENT:
      return {
        ...initAssessmentState,

        verifyCandidateResponse: state.verifyCandidateResponse,
        openScreeningQuestionsModal:
          state.verifyCandidateResponse.applicant.job.screeningQ.length > 0,
      };
    case ActionType.START_ASSESSMENT:
      return {
        ...state,
        userAssessmentId: action.payload.userAssessmentId,
        assessmentLib: action.payload.assessmentLib,
        questions: initQuestions(action.payload.assessmentLib.questions),
        endsOn: Date.now() + action.payload.assessmentLib.duration * 60 * 1000,
        startedOn: Date.now(),
      };

      
    case ActionType.START_QUESTION_LOADING:
      return { ...state, questionLoading: true };

    case ActionType.END_QUESTION_LOADING:
      return { ...state, questionLoading: false };

    case ActionType.END_ASSESSMENT:
      return initAssessmentState;

    case ActionType.GET_QUESTION:
      return {
        ...state,
        questions: insertQuestion(state.questions, action.payload),
        currentQuestion: action.payload,
      };

    case ActionType.UPDATE_CURRENT_SQ:
      return {
        ...state,
        currentScreeningAnswer: action.payload,
      };
    case ActionType.UPDATE_OPEN_SQ_MODAL_OPEN:
      return {
        ...state,
        openScreeningQuestionsModal: action.payload,
      };

    case ActionType.GET_REPORT:
      return {
        ...state,
        report: action.payload,
      };

    case ActionType.LOAD_QUESTION:
      return { ...state, currentQuestion: action.payload };

    case ActionType.UPDATE_ANSWER:
      return {
        ...state,
        currentQuestion: { ...state.currentQuestion, answer: action.payload },
      };
    case ActionType.UPDATE_ANSWER_SQ:
      return {
        ...state,
        screeningQuestions: action.payload,
        currentScreeningAnswer: {
          question: "",
          answer: "",
        },

        // {
        //   currentQNumber: state.screeningQuestions.currentQNumber + 1,
        //   answers: [...state.screeningQuestions.answers, action.payload],
        // },
      };

    case ActionType.UPDATE_QUESTION_STATUS:
      return {
        ...state,
        questions: update_question_status(
          state.currentQuestion,
          state.questions,
          action.payload
        ).questions,
        currentQuestion: update_question_status(
          state.currentQuestion,
          state.questions,
          action.payload
        ).currentQuestion,
      };

    case ActionType.SUBMIT_ANSWER:
      return {
        ...state,
        questions: updated_question_after_submission(
          state.questions,
          state.currentQuestion,
          action.payload
        ).questions,
        currentQuestion: updated_question_after_submission(
          state.questions,
          state.currentQuestion,
          action.payload
        ).currentQuestion,
      };

    case ActionType.SHOW_REVIEW:
      return { ...state, isReview: true };

    case ActionType.HIDE_REVIEW:
      return { ...state, isReview: false };

    case ActionType.SET_COMPLETED:
      return { ...state, isCompleted: true };

    case ActionType.ANSWER_SKIPPING:
      return { ...state, isSkip: true };
    case ActionType.UPDATE_TIME_ELAPSED:
      return { ...state, timeElapsed: action.payload };
    case ActionType.OPEN_ASSESSMENT_DRAWER:
      return { ...state, drawerOpen: true };
    case ActionType.CLOSE_ASSESSMENT_DRAWER:
      return { ...state, drawerOpen: false };

    case ActionType.LOAD_QUESTION_BY_INDEX:
      return {
        ...state,
        currentQuestion: get_question_by_index(state.questions, action.payload),
      };

    default:
      return state;
  }
};

export default assessment_app_reducers;
