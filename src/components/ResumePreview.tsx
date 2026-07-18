/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Paper, 
  Box, 
  Typography, 
  Button, 
  Stack 
} from "@mui/material";
import { ResumeData, TemplateStyle } from "../types";
import { Printer, Edit3, Sparkles, Check, CheckCircle } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  templateStyle: TemplateStyle;
  jobTitle: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  setData,
  templateStyle,
  jobTitle,
}) => {
  // Local states for header details (to make them completely editable!)
  const [personalInfo, setPersonalInfo] = useState({
    name: "Alex Johnson",
    contact: "New York, NY 10001 | (555) 123-4567 | alex.johnson@email.com | linkedin.com/in/alexj",
    degree: "Bachelor of Science in Business Administration",
    school: "State University",
    gradDate: "May 2018",
    gpa: "GPA: 3.8 / 4.0",
    company1: "Global Innovations Inc.",
    dates1: "Jan 2021 - Present",
    location1: "New York, NY",
    company2: "TechSolutions LLC",
    dates2: "Aug 2018 - Dec 2020",
    role2: "Associate Analyst",
    location2: "Boston, MA",
    bullet2_1: "Managed day-to-day operations and improved client retention rates by 22% over two years.",
    bullet2_2: "Developed comprehensive reporting dashboards that reduced data extraction time by 40 hours per month."
  });

  const handleInfoChange = (field: keyof typeof personalInfo, val: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: val }));
  };

  const handleDataChange = (field: keyof ResumeData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  // Set font class based on selected style
  const getStyleClasses = () => {
    switch (templateStyle) {
      case "ats-traditional":
        return {
          container: "ats-traditional",
          fontFamily: "font-serif", // Times / Georgia
          headerClass: "text-center border-b-[1.5px] border-black pb-4 mb-4",
          sectionTitle: "text-base font-bold uppercase border-b border-neutral-800 tracking-wider mb-2.5 pb-0.5",
          bodyText: "text-sm text-black leading-relaxed",
          bulletText: "text-sm text-black leading-relaxed"
        };
      case "ats-modern":
        return {
          container: "ats-modern",
          fontFamily: "font-sans", // Arial / Helvetica
          headerClass: "text-left border-l-4 border-blue-600 pl-4 py-1 mb-5",
          sectionTitle: "text-sm font-bold uppercase text-neutral-800 tracking-widest border-b border-neutral-200 mb-3 pb-1",
          bodyText: "text-[13px] text-neutral-800 leading-relaxed",
          bulletText: "text-[13px] text-neutral-800 leading-relaxed"
        };
      case "ats-executive":
        return {
          container: "ats-executive",
          fontFamily: "font-serif", // Garamond styled serif
          headerClass: "text-center border-b border-double border-neutral-800 pb-3 mb-5",
          sectionTitle: "text-base font-semibold uppercase tracking-widest text-neutral-900 border-b border-neutral-400 mb-3 pb-1 font-semibold",
          bodyText: "text-sm text-neutral-900 leading-relaxed italic-p",
          bulletText: "text-sm text-neutral-900 leading-relaxed"
        };
      case "ats-clean":
        return {
          container: "ats-clean",
          fontFamily: "font-sans",
          headerClass: "text-center pb-2 mb-4",
          sectionTitle: "text-xs font-bold uppercase tracking-widest text-blue-700 mb-2 pb-0.5",
          bodyText: "text-[13px] text-neutral-800 leading-relaxed",
          bulletText: "text-[13px] text-neutral-800 leading-relaxed"
        };
    }
  };

  const sc = getStyleClasses();

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* Print Instructions / Toolbar using Material UI */}
      <Paper 
        sx={{ 
          width: "100%", 
          maxWidth: 850, 
          p: 2, 
          mb: 3, 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, 
          justifyContent: "space-between", 
          alignItems: { xs: "flex-start", sm: "center" }, 
          gap: 2,
          bgcolor: "background.paper"
        }}
        className="print:hidden"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Edit3 className="text-slate-500" size={18} />
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "12px", fontWeight: 500 }}>
            💡 <strong>Pro Tip:</strong> Click any text directly on the resume below to edit or customize it!
          </Typography>
        </Box>
        <Button
          id="btn-print-resume"
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => window.print()}
          startIcon={<Printer size={14} />}
          sx={{ fontWeight: "bold", fontSize: "12px", px: 2.5, py: 1, textTransform: "none" }}
        >
          Export PDF / Print
        </Button>
      </Paper>

      {/* Resume Canvas Container */}
      <Box 
        sx={{ 
          width: "100%", 
          overflowX: "auto", 
          pb: 2, 
          bgcolor: "slate.100", 
          border: "1px solid", 
          borderColor: "slate.200", 
          borderRadius: "8px", 
          p: { xs: 2, sm: 3 }, 
          display: "flex", 
          justifyContent: "center" 
        }}
      >
        {/* Printable Paper */}
        <div
          id="resume-preview"
          className={`bg-white w-[850px] min-h-[1100px] shadow-2xl p-12 sm:p-14 text-left border border-slate-200 relative select-text transition-all duration-300 ${sc.fontFamily}`}
        >
          {/* Header section */}
          <div className={sc.headerClass}>
            <input
              id="personalInfo-name"
              type="text"
              value={personalInfo.name}
              onChange={(e) => handleInfoChange("name", e.target.value)}
              placeholder="Your Name"
              className="w-full text-center bg-transparent border-0 hover:bg-neutral-50 focus:bg-white text-3xl font-bold uppercase tracking-wide text-neutral-900 outline-none p-1 rounded transition font-serif"
            />
            <textarea
              id="personalInfo-contact"
              rows={1}
              value={personalInfo.contact}
              onChange={(e) => handleInfoChange("contact", e.target.value)}
              placeholder="Address | Phone | Email | LinkedIn"
              className="w-full text-center bg-transparent border-0 hover:bg-neutral-50 focus:bg-white text-xs text-neutral-600 outline-none resize-none p-1 rounded transition mt-1"
            />
          </div>

          {/* Professional Summary Section */}
          <div className="mb-5">
            <h3 className={sc.sectionTitle}>Professional Summary</h3>
            <textarea
              id="resumeData-summary"
              rows={4}
              value={data.summary}
              onChange={(e) => handleDataChange("summary", e.target.value)}
              placeholder="Professional summary describing your skills, target industry, and career goals."
              className={`w-full bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none resize-none p-1 rounded transition text-justify ${sc.bodyText}`}
            />
          </div>

          {/* Core Competencies Section */}
          <div className="mb-5">
            <h3 className={sc.sectionTitle}>Core Competencies</h3>
            <textarea
              id="resumeData-skills"
              rows={2}
              value={data.skills.join(" | ")}
              onChange={(e) => {
                const arr = e.target.value.split("|").map(s => s.trim());
                setData(prev => ({ ...prev, skills: arr }));
              }}
              placeholder="Skill 1 | Skill 2 | Skill 3..."
              className={`w-full bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none resize-none p-1 rounded transition font-semibold ${sc.bodyText}`}
            />
          </div>

          {/* Professional Experience Section */}
          <div className="mb-5">
            <h3 className={sc.sectionTitle}>Professional Experience</h3>

            {/* Job 1 (Dynamically populated from AI) */}
            <div className="mb-5">
              <div className="flex justify-between font-bold text-sm sm:text-base text-neutral-900">
                <input
                  id="personalInfo-company1"
                  type="text"
                  value={personalInfo.company1}
                  onChange={(e) => handleInfoChange("company1", e.target.value)}
                  placeholder="Company Name"
                  className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/2 font-bold"
                />
                <input
                  id="personalInfo-dates1"
                  type="text"
                  value={personalInfo.dates1}
                  onChange={(e) => handleInfoChange("dates1", e.target.value)}
                  placeholder="Date Range"
                  className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/3 text-right font-bold"
                />
              </div>
              <div className="flex justify-between italic text-xs sm:text-sm text-neutral-700 mb-2">
                <span className="font-semibold capitalize text-neutral-800">
                  {jobTitle || "Senior Professional / Candidate"}
                </span>
                <input
                  id="personalInfo-location1"
                  type="text"
                  value={personalInfo.location1}
                  onChange={(e) => handleInfoChange("location1", e.target.value)}
                  placeholder="Location"
                  className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/4 text-right italic"
                />
              </div>

              {/* Bullet points */}
              <ul className="list-disc list-outside text-neutral-800 text-sm ml-5 space-y-1.5">
                <li className="pl-1">
                  <textarea
                    id="resumeData-b1"
                    rows={2}
                    value={data.b1}
                    onChange={(e) => handleDataChange("b1", e.target.value)}
                    placeholder="Bullet point 1 detailing critical achievements with quantifiable metrics"
                    className={`w-full bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none resize-none p-0.5 rounded transition ${sc.bulletText}`}
                  />
                </li>
                <li className="pl-1">
                  <textarea
                    id="resumeData-b2"
                    rows={2}
                    value={data.b2}
                    onChange={(e) => handleDataChange("b2", e.target.value)}
                    placeholder="Bullet point 2 outlining high performance with tools and solutions"
                    className={`w-full bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none resize-none p-0.5 rounded transition ${sc.bulletText}`}
                  />
                </li>
                <li className="pl-1">
                  <textarea
                    id="resumeData-b3"
                    rows={2}
                    value={data.b3}
                    onChange={(e) => handleDataChange("b3", e.target.value)}
                    placeholder="Bullet point 3 mentioning cross-functional collaborations and outputs"
                    className={`w-full bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none resize-none p-0.5 rounded transition ${sc.bulletText}`}
                  />
                </li>
              </ul>
            </div>

            {/* Job 2 (Preset historical job) */}
            <div className="mb-4">
              <div className="flex justify-between font-bold text-sm sm:text-base text-neutral-900">
                <input
                  id="personalInfo-company2"
                  type="text"
                  value={personalInfo.company2}
                  onChange={(e) => handleInfoChange("company2", e.target.value)}
                  placeholder="Historical Company"
                  className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/2 font-bold"
                />
                <input
                  id="personalInfo-dates2"
                  type="text"
                  value={personalInfo.dates2}
                  onChange={(e) => handleInfoChange("dates2", e.target.value)}
                  placeholder="Date Range"
                  className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/3 text-right font-bold"
                />
              </div>
              <div className="flex justify-between italic text-xs sm:text-sm text-neutral-700 mb-2">
                <input
                  id="personalInfo-role2"
                  type="text"
                  value={personalInfo.role2}
                  onChange={(e) => handleInfoChange("role2", e.target.value)}
                  placeholder="Previous Role"
                  className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/2 font-semibold text-neutral-800"
                />
                <input
                  id="personalInfo-location2"
                  type="text"
                  value={personalInfo.location2}
                  onChange={(e) => handleInfoChange("location2", e.target.value)}
                  placeholder="Location"
                  className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/4 text-right italic"
                />
              </div>

              {/* Bullet points */}
              <ul className="list-disc list-outside text-neutral-800 text-sm ml-5 space-y-1.5">
                <li className="pl-1">
                  <textarea
                    id="personalInfo-bullet2_1"
                    rows={2}
                    value={personalInfo.bullet2_1}
                    onChange={(e) => handleInfoChange("bullet2_1", e.target.value)}
                    placeholder="Details about secondary job achievement and processes"
                    className={`w-full bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none resize-none p-0.5 rounded transition ${sc.bulletText}`}
                  />
                </li>
                <li className="pl-1">
                  <textarea
                    id="personalInfo-bullet2_2"
                    rows={2}
                    value={personalInfo.bullet2_2}
                    onChange={(e) => handleInfoChange("bullet2_2", e.target.value)}
                    placeholder="Reporting, dashboard optimization, and task completions"
                    className={`w-full bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none resize-none p-0.5 rounded transition ${sc.bulletText}`}
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-4">
            <h3 className={sc.sectionTitle}>Education</h3>
            <div className="flex justify-between font-bold text-sm sm:text-base text-neutral-900">
              <input
                id="personalInfo-school"
                type="text"
                value={personalInfo.school}
                onChange={(e) => handleInfoChange("school", e.target.value)}
                placeholder="School/University"
                className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/2 font-bold"
              />
              <input
                id="personalInfo-gradDate"
                type="text"
                value={personalInfo.gradDate}
                onChange={(e) => handleInfoChange("gradDate", e.target.value)}
                placeholder="Graduation Date"
                className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/3 text-right font-bold"
              />
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-neutral-800 mt-1">
              <input
                id="personalInfo-degree"
                type="text"
                value={personalInfo.degree}
                onChange={(e) => handleInfoChange("degree", e.target.value)}
                placeholder="Degree/Certificate"
                className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-3/4 text-neutral-800"
              />
              <input
                id="personalInfo-gpa"
                type="text"
                value={personalInfo.gpa}
                onChange={(e) => handleInfoChange("gpa", e.target.value)}
                placeholder="GPA Details"
                className="bg-transparent border-0 hover:bg-neutral-50 focus:bg-white outline-none p-0.5 rounded transition w-1/4 text-right italic text-neutral-600"
              />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};
