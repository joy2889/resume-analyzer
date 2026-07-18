export interface PersonalInfo {
  name: string;
  contact: string;
  company1: string;
  dates1: string;
  role1?: string;
  location1: string;
  company2: string;
  dates2: string;
  role2: string;
  location2: string;
  bullet2_1: string;
  bullet2_2: string;
  school: string;
  gradDate: string;
  degree: string;
  gpa: string;
}

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
