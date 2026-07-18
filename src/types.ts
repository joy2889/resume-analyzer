export interface ResumeData {
  summary: string;
  skills: string[];
  b1: string;
  b2: string;
  b3: string;
  actionVerbs: string[];
  achievements: string;
  keywords: string[];
  atsScore: number;
  atsFeedback: string[];
}

export interface SearchParams {
  jobTitle: string;
  industry: string;
  experienceLevel: string;
  additionalContext: string;
  currentSkills: string;
}

export type TemplateStyle = "ats-traditional" | "ats-modern" | "ats-executive" | "ats-clean";

export interface TemplateStyleOption {
  id: TemplateStyle;
  name: string;
  description: string;
  className: string;
}
