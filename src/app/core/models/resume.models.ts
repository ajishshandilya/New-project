export interface UploadAssets {
  resumeFile: File | null;
  jobDescriptionText: string;
  jobDescriptionFile: File | null;
  templateFile: File | null;
}

export interface WorkflowProgress {
  activeStep: 1 | 2 | 3;
  percent: number;
  message: string;
  running: boolean;
  complete: boolean;
}

export interface ResumeExperience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeEducation {
  degree: string;
  school: string;
}

export interface ResumeDraft {
  fullName: string;
  title: string;
  email: string;
  location: string;
  portfolio: string;
  summary: string;
  expertise: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
}

export interface AtsInsightCard {
  label: string;
  value: string;
  detail: string;
}

export interface OptimizationResult {
  fileLabel: string;
  score: number;
  scoreLabel: string;
  matchedKeywords: number;
  totalKeywords: number;
  actionVerbNote: string;
  layoutNote: string;
  candidateRank: string;
  proTip: string;
  resume: ResumeDraft;
  insights: AtsInsightCard[];
}
