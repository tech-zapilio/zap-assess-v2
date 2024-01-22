export type Question = {
  _id: string;
  question: string;
  questionType: string;
  code: string;
  options: {
    name: string;
    value: string;
    _id: string;
  }[];
  skill: string;
  competency: string;
  suggestion: string;
  size: string;
  range: string;
  settings: {
    name: string;
    value: string;
    _id: string;
  }[];
  isSample: boolean;
  level: string;
  time: number;
  isMaster: boolean;
  assessmentRef: null | any; // Replace 'any' with the actual type if needed
  customer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type QuestionIndex = {
  index: number;
  answer: string;
  isAnswered: boolean;
  isSkipped: boolean;
  question: Question;
};

export type AnswerResponse = {
  userAssessmentId: string;
  question: string;
  response: string;
  isComplete: boolean;
  timeElapsed: string;
};

export type QuestionStatus = {
  isAnswered: boolean;
  isSkipped: boolean;
  index: number;
};
