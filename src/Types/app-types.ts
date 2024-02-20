export type Instruction = {
  icon: string;
  title: string;
  text: string;
};

export type Job = {
  _id: string;
  retrySKIP: boolean;
  bRandQuestion: boolean;
  bDisplayReport: boolean;
  isFullScreen: boolean;
  isSubjectiveEval: boolean;
  bAllowSkip: boolean;
  jobCode: string;
  shortDesc: string;
  status: string;
  assessmentLib: {
    description: string;
    _id: string;
    type: string;
  };
  screeningQ: ScreeningQ[]
};

export type Assessment = {
  _id: string;
  instructions: Instruction[];
  totalQuestions: number;
  totalTime: number;
  settings: any[]; // Update with actual settings  export    type if available
  name: string;
  image: string;
};

export type Customer = {
  name: string;
  logoURL: string;
  welcomeVideoURL: string;
  termsConditions: string;
};

export type Applicant = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  sentAt: string;
  expiresAt: string;
  status: string;
  stage: string;
  type: string;
  job: Job;
  assessment: Assessment;
  customer: Customer;
  attempts: number;
  accessedAt: string;
  updatedAt: string;
};

export type LastAttempt = {
  answered: number;
  skipped: number;
  timeElapsed: string;
};

export type CustomerDetails = {
  name: string;
  logoURL: string;
  welcomeVideoURL: string;
  termsConditions: string;
  registedName:string;
};

export type AuthToken = string;

export type Mapping = any[]; // Update with actual mapping  export    type if available

export type GetAssessmentData = {
  applicant: Applicant;
  lastAttempt: LastAttempt;
  customer: CustomerDetails;
  authToken: AuthToken;
  mapping: Mapping;
};

export type EventDetails = {
  assessment: Assessment;
  accessCode: number;
  customer: CustomerDetails;
  isFullScreen: boolean;
  isSubjectiveEval: boolean;
  jobCode: string;
  retrySKIP: boolean;
  shortDesc: string;
  _id: string;
};

export interface ScreeningQ {
  _id: string
  question: string
  type: string
  options: string[]
  isDefault: boolean
  customer: string
  createdAt: string
  updatedAt: string
  __v: number
}