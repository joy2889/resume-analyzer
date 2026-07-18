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
  Stack,
  TextField
} from "@mui/material";
import { ResumeData, TemplateStyle } from "../types";
import { Printer, Edit3, Sparkles, Check, CheckCircle, GripVertical } from "lucide-react";

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

  // Drag and Drop reordering states for Bullet Points
  const [draggedItem, setDraggedItem] = useState<{ jobIndex: number; index: number } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ jobIndex: number; index: number } | null>(null);

  const handleDragStart = (e: React.DragEvent, jobIndex: number, index: number) => {
    if (e.target instanceof HTMLTextAreaElement) {
      // Don't drag if user is highlighting text inside textarea
      return;
    }
    setDraggedItem({ jobIndex, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, jobIndex: number, index: number) => {
    e.preventDefault();
    if (draggedItem && draggedItem.jobIndex === jobIndex) {
      setDragOverItem({ jobIndex, index });
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, jobIndex: number, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.jobIndex !== jobIndex) return;

    const sourceIndex = draggedItem.index;
    if (sourceIndex === targetIndex) return;

    if (jobIndex === 1) {
      const keys = ["b1", "b2", "b3"] as const;
      const newOrder = [...keys];
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(targetIndex, 0, removed);

      const val1 = data[newOrder[0]];
      const val2 = data[newOrder[1]];
      const val3 = data[newOrder[2]];

      setData(prev => ({
        ...prev,
        b1: val1,
        b2: val2,
        b3: val3
      }));
    } else if (jobIndex === 2) {
      const keys = ["bullet2_1", "bullet2_2"] as const;
      const newOrder = [...keys];
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(targetIndex, 0, removed);

      const val1 = personalInfo[newOrder[0]];
      const val2 = personalInfo[newOrder[1]];

      setPersonalInfo(prev => ({
        ...prev,
        bullet2_1: val1,
        bullet2_2: val2
      }));
    }

    setDraggedItem(null);
    setDragOverItem(null);
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
            <TextField
              id="personalInfo-name"
              value={personalInfo.name}
              onChange={(e) => handleInfoChange("name", e.target.value)}
              placeholder="Your Name"
              variant="standard"
              fullWidth
              slotProps={{
                input: {
                  disableUnderline: true,
                },
                htmlInput: {
                  className: "w-full text-center bg-transparent border-0 hover:bg-neutral-50 focus:bg-white text-3xl font-bold uppercase tracking-wide text-neutral-900 p-1 rounded transition font-serif",
                  style: { textAlign: "center", padding: "4px" }
                }
              }}
            />
            <TextField
              id="personalInfo-contact"
              multiline
              rows={1}
              value={personalInfo.contact}
              onChange={(e) => handleInfoChange("contact", e.target.value)}
              placeholder="Address | Phone | Email | LinkedIn"
              variant="standard"
              fullWidth
              slotProps={{
                input: {
                  disableUnderline: true,
                },
                htmlInput: {
                  className: "w-full text-center bg-transparent border-0 hover:bg-neutral-50 focus:bg-white text-xs text-neutral-600 p-1 rounded transition mt-1",
                  style: { textAlign: "center", padding: "4px" }
                }
              }}
            />
          </div>

          {/* Professional Summary Section */}
          <div className="mb-5">
            <h3 className={sc.sectionTitle}>Professional Summary</h3>
            <TextField
              id="resumeData-summary"
              multiline
              minRows={3}
              maxRows={8}
              value={data.summary}
              onChange={(e) => handleDataChange("summary", e.target.value)}
              placeholder="Professional summary describing your skills, target industry, and career goals."
              variant="standard"
              fullWidth
              slotProps={{
                input: {
                  disableUnderline: true,
                },
                htmlInput: {
                  className: `w-full bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-1 rounded transition text-justify ${sc.bodyText}`
                }
              }}
            />
          </div>

          {/* Core Competencies Section */}
          <div className="mb-5">
            <h3 className={sc.sectionTitle}>Core Competencies</h3>
            <TextField
              id="resumeData-skills"
              multiline
              minRows={1}
              maxRows={4}
              value={data.skills.join(" | ")}
              onChange={(e) => {
                const arr = e.target.value.split("|").map(s => s.trim());
                setData(prev => ({ ...prev, skills: arr }));
              }}
              placeholder="Skill 1 | Skill 2 | Skill 3..."
              variant="standard"
              fullWidth
              slotProps={{
                input: {
                  disableUnderline: true,
                },
                htmlInput: {
                  className: `w-full bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-1 rounded transition font-semibold ${sc.bodyText}`
                }
              }}
            />
          </div>

          {/* Professional Experience Section */}
          <div className="mb-5">
            <h3 className={sc.sectionTitle}>Professional Experience</h3>

            {/* Job 1 (Dynamically populated from AI) */}
            <div className="mb-5">
              <div className="flex justify-between items-center font-bold text-sm sm:text-base text-neutral-900">
                <TextField
                  id="personalInfo-company1"
                  value={personalInfo.company1}
                  onChange={(e) => handleInfoChange("company1", e.target.value)}
                  placeholder="Company Name"
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                    htmlInput: {
                      className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition font-bold"
                    }
                  }}
                  sx={{ width: "50%" }}
                />
                <TextField
                  id="personalInfo-dates1"
                  value={personalInfo.dates1}
                  onChange={(e) => handleInfoChange("dates1", e.target.value)}
                  placeholder="Date Range"
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                    htmlInput: {
                      className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition text-right font-bold",
                      style: { textAlign: "right" }
                    }
                  }}
                  sx={{ width: "33.3333%" }}
                />
              </div>
              <div className="flex justify-between items-center italic text-xs sm:text-sm text-neutral-700 mb-2">
                <span className="font-semibold capitalize text-neutral-800 p-0.5">
                  {jobTitle || "Senior Professional / Candidate"}
                </span>
                <TextField
                  id="personalInfo-location1"
                  value={personalInfo.location1}
                  onChange={(e) => handleInfoChange("location1", e.target.value)}
                  placeholder="Location"
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                    htmlInput: {
                      className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition text-right italic",
                      style: { textAlign: "right" }
                    }
                  }}
                  sx={{ width: "25%" }}
                />
              </div>

              {/* Bullet points */}
              <div className="print:hidden text-[10px] text-neutral-400 mb-1 flex items-center gap-1 select-none">
                <span>⚡ Drag the handle</span>
                <GripVertical size={10} className="inline" />
                <span>next to bullet points to reorder experience achievements!</span>
              </div>
              <ul className="list-none text-neutral-800 text-sm space-y-1.5">
                {(["b1", "b2", "b3"] as const).map((key, i) => {
                  const placeholders = {
                    b1: "Bullet point 1 detailing critical achievements with quantifiable metrics",
                    b2: "Bullet point 2 outlining high performance with tools and solutions",
                    b3: "Bullet point 3 mentioning cross-functional collaborations and outputs"
                  };
                  return (
                    <li
                      key={key}
                      draggable
                      onDragStart={(e) => handleDragStart(e, 1, i)}
                      onDragOver={(e) => handleDragOver(e, 1, i)}
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => handleDrop(e, 1, i)}
                      className={`group relative pl-6 pr-1 py-0.5 rounded transition-all duration-200 ${
                        draggedItem?.jobIndex === 1 && draggedItem?.index === i 
                          ? "opacity-30 bg-neutral-100 scale-[0.98] border border-dashed border-neutral-400" 
                          : "hover:bg-neutral-50/70"
                      } ${
                        dragOverItem?.jobIndex === 1 && dragOverItem?.index === i 
                          ? "border-t-2 border-indigo-500 bg-indigo-50/20" 
                          : ""
                      }`}
                    >
                      {/* Drag Handle on Hover */}
                      <div className="absolute left-0.5 top-[7px] opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-neutral-400 print:hidden flex items-center justify-center">
                        <GripVertical size={13} />
                      </div>
                      
                      {/* Custom Bullet Indicator */}
                      <span className="absolute left-3 top-[11px] w-1.5 h-1.5 rounded-full bg-neutral-800"></span>

                      <TextField
                        id={`resumeData-${key}`}
                        multiline
                        minRows={1}
                        maxRows={4}
                        value={data[key]}
                        onChange={(e) => handleDataChange(key, e.target.value)}
                        placeholder={placeholders[key]}
                        variant="standard"
                        fullWidth
                        slotProps={{
                          input: {
                            disableUnderline: true,
                          },
                          htmlInput: {
                            className: `w-full bg-transparent border-0 focus:bg-white p-0.5 rounded transition ${sc.bulletText}`
                          }
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Job 2 (Preset historical job) */}
            <div className="mb-4">
              <div className="flex justify-between items-center font-bold text-sm sm:text-base text-neutral-900">
                <TextField
                  id="personalInfo-company2"
                  value={personalInfo.company2}
                  onChange={(e) => handleInfoChange("company2", e.target.value)}
                  placeholder="Historical Company"
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                    htmlInput: {
                      className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition font-bold"
                    }
                  }}
                  sx={{ width: "50%" }}
                />
                <TextField
                  id="personalInfo-dates2"
                  value={personalInfo.dates2}
                  onChange={(e) => handleInfoChange("dates2", e.target.value)}
                  placeholder="Date Range"
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                    htmlInput: {
                      className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition text-right font-bold",
                      style: { textAlign: "right" }
                    }
                  }}
                  sx={{ width: "33.3333%" }}
                />
              </div>
              <div className="flex justify-between items-center italic text-xs sm:text-sm text-neutral-700 mb-2">
                <TextField
                  id="personalInfo-role2"
                  value={personalInfo.role2}
                  onChange={(e) => handleInfoChange("role2", e.target.value)}
                  placeholder="Previous Role"
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                    htmlInput: {
                      className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition font-semibold text-neutral-800"
                    }
                  }}
                  sx={{ width: "50%" }}
                />
                <TextField
                  id="personalInfo-location2"
                  value={personalInfo.location2}
                  onChange={(e) => handleInfoChange("location2", e.target.value)}
                  placeholder="Location"
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                    htmlInput: {
                      className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition text-right italic",
                      style: { textAlign: "right" }
                    }
                  }}
                  sx={{ width: "25%" }}
                />
              </div>

              {/* Bullet points */}
              <ul className="list-none text-neutral-800 text-sm space-y-1.5">
                {(["bullet2_1", "bullet2_2"] as const).map((key, i) => {
                  const placeholders = {
                    bullet2_1: "Details about secondary job achievement and processes",
                    bullet2_2: "Reporting, dashboard optimization, and task completions"
                  };
                  return (
                    <li
                      key={key}
                      draggable
                      onDragStart={(e) => handleDragStart(e, 2, i)}
                      onDragOver={(e) => handleDragOver(e, 2, i)}
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => handleDrop(e, 2, i)}
                      className={`group relative pl-6 pr-1 py-0.5 rounded transition-all duration-200 ${
                        draggedItem?.jobIndex === 2 && draggedItem?.index === i 
                          ? "opacity-30 bg-neutral-100 scale-[0.98] border border-dashed border-neutral-400" 
                          : "hover:bg-neutral-50/70"
                      } ${
                        dragOverItem?.jobIndex === 2 && dragOverItem?.index === i 
                          ? "border-t-2 border-indigo-500 bg-indigo-50/20" 
                          : ""
                      }`}
                    >
                      {/* Drag Handle on Hover */}
                      <div className="absolute left-0.5 top-[7px] opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-neutral-400 print:hidden flex items-center justify-center">
                        <GripVertical size={13} />
                      </div>
                      
                      {/* Custom Bullet Indicator */}
                      <span className="absolute left-3 top-[11px] w-1.5 h-1.5 rounded-full bg-neutral-800"></span>

                      <TextField
                        id={`personalInfo-${key}`}
                        multiline
                        minRows={1}
                        maxRows={4}
                        value={personalInfo[key]}
                        onChange={(e) => handleInfoChange(key, e.target.value)}
                        placeholder={placeholders[key]}
                        variant="standard"
                        fullWidth
                        slotProps={{
                          input: {
                            disableUnderline: true,
                          },
                          htmlInput: {
                            className: `w-full bg-transparent border-0 focus:bg-white p-0.5 rounded transition ${sc.bulletText}`
                          }
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-4">
            <h3 className={sc.sectionTitle}>Education</h3>
            <div className="flex justify-between items-center font-bold text-sm sm:text-base text-neutral-900">
              <TextField
                id="personalInfo-school"
                value={personalInfo.school}
                onChange={(e) => handleInfoChange("school", e.target.value)}
                placeholder="School/University"
                variant="standard"
                slotProps={{
                  input: {
                    disableUnderline: true,
                  },
                  htmlInput: {
                    className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition font-bold"
                  }}
                }
                sx={{ width: "50%" }}
              />
              <TextField
                id="personalInfo-gradDate"
                value={personalInfo.gradDate}
                onChange={(e) => handleInfoChange("gradDate", e.target.value)}
                placeholder="Graduation Date"
                variant="standard"
                slotProps={{
                  input: {
                    disableUnderline: true,
                  },
                  htmlInput: {
                    className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition text-right font-bold",
                    style: { textAlign: "right" }
                  }}
                }
                sx={{ width: "33.3333%" }}
              />
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm text-neutral-800 mt-1">
              <TextField
                id="personalInfo-degree"
                value={personalInfo.degree}
                onChange={(e) => handleInfoChange("degree", e.target.value)}
                placeholder="Degree/Certificate"
                variant="standard"
                slotProps={{
                  input: {
                    disableUnderline: true,
                  },
                  htmlInput: {
                    className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition text-neutral-800"
                  }}
                }
                sx={{ width: "75%" }}
              />
              <TextField
                id="personalInfo-gpa"
                value={personalInfo.gpa}
                onChange={(e) => handleInfoChange("gpa", e.target.value)}
                placeholder="GPA Details"
                variant="standard"
                slotProps={{
                  input: {
                    disableUnderline: true,
                  },
                  htmlInput: {
                    className: "bg-transparent border-0 hover:bg-neutral-50 focus:bg-white p-0.5 rounded transition text-right italic text-neutral-600",
                    style: { textAlign: "right" }
                  }}
                }
                sx={{ width: "25%" }}
              />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};
