 
export type AssessmentDetails = {
  _id: string;
  assessmentlibs: string;
  type: string;
  name: string;
  description: string;
  duration: number;
  questions: number;
  image: string;
  skills: AssessmentSkill[];
  instructions: string;
  bestFor: string;
  shortDesc: string;
  isLocked: boolean;
  level: string;
  isMaster: boolean;
  updatedAt: string;
};

export type AssessmentSkill = {
  name: string;
  description: string;
  image: string;
  scorePercent: number;
  questions: number;
  correctAnswer: number;
  weight: {
    $numberDecimal: string;
  };
};

 