import React, { useState } from "react";
import { ResumeData, TemplateStyle, PersonalInfo } from "../types";
import { Printer, Edit3, Sparkles, CheckCircle } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  templateStyle: TemplateStyle;
  jobTitle: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  setData,
  personalInfo,
  setPersonalInfo,
  templateStyle,
  jobTitle,
}) => {
  const handleInfoChange = (field: keyof typeof personalInfo, val: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: val }));
  };

  const handleDataChange = (field: keyof ResumeData, val: string | string[]) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const printDocument = () => {
    window.print();
  };

  const isModern = templateStyle === "ats-modern";

  return (
    <div className="flex flex-col relative w-full h-full">
      {/* Top action bar - Neo-Brutalist Style */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white border-4 border-black p-4 mb-6 shadow-neo-sm print:hidden">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="bg-neo-accent p-2 border-4 border-black shadow-neo-sm">
            <Edit3 size={24} strokeWidth={3} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-black text-2xl uppercase tracking-wider leading-none">
              Live Preview
            </h3>
            <p className="font-bold text-sm text-black/70">Click any text block below to edit instantly.</p>
          </div>
        </div>
        
        <button 
          onClick={printDocument}
          className="btn-neo bg-neo-secondary px-6 py-3 flex items-center gap-2"
        >
          <Printer size={20} strokeWidth={3} /> EXPORT PDF
        </button>
      </div>

      {/* Actual Resume Page */}
      <div className="bg-white text-black p-8 md:p-12 border-4 border-black shadow-neo-lg mx-auto w-full max-w-4xl" style={{ minHeight: "1056px", fontFamily: isModern ? 'Arial, sans-serif' : '"Times New Roman", Times, serif' }}>
        
        {/* HEADER SECTION */}
        <div className={`mb-6 border-b-4 border-black pb-4 ${isModern ? 'text-left' : 'text-center'}`}>
          <input
            type="text"
            value={personalInfo.name}
            onChange={(e) => handleInfoChange("name", e.target.value)}
            className={`w-full bg-transparent font-bold text-4xl focus:outline-none focus:bg-neo-secondary/30 p-1 ${isModern ? 'text-left' : 'text-center'}`}
          />
          <input
            type="text"
            value={personalInfo.contact}
            onChange={(e) => handleInfoChange("contact", e.target.value)}
            className={`w-full bg-transparent text-sm mt-1 focus:outline-none focus:bg-neo-secondary/30 p-1 ${isModern ? 'text-left' : 'text-center'}`}
          />
        </div>

        {/* SUMMARY SECTION */}
        <div className="mb-6">
          <h3 className="font-bold text-lg uppercase tracking-wider mb-2 border-b-2 border-black">Professional Summary</h3>
          <textarea
            value={data.summary}
            onChange={(e) => handleDataChange("summary", e.target.value)}
            rows={4}
            className="w-full bg-transparent text-sm leading-relaxed focus:outline-none focus:bg-neo-secondary/30 p-1 resize-none"
          />
        </div>

        {/* CORE COMPETENCIES SECTION */}
        <div className="mb-6">
          <h3 className="font-bold text-lg uppercase tracking-wider mb-2 border-b-2 border-black">Core Competencies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {data.skills.map((skill, idx) => (
              <input
                key={idx}
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...data.skills];
                  newSkills[idx] = e.target.value;
                  handleDataChange("skills", newSkills);
                }}
                className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 list-inside list-disc"
              />
            ))}
          </div>
        </div>

        {/* PROFESSIONAL EXPERIENCE SECTION */}
        <div className="mb-6">
          <h3 className="font-bold text-lg uppercase tracking-wider mb-4 border-b-2 border-black">Professional Experience</h3>
          
          {/* Job 1 */}
          <div className="mb-5">
            <div className="flex justify-between font-bold text-sm mb-1">
              <input 
                type="text" 
                value={personalInfo.company1} 
                onChange={(e) => handleInfoChange("company1", e.target.value)}
                className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 font-bold w-1/2"
              />
              <input 
                type="text" 
                value={personalInfo.dates1} 
                onChange={(e) => handleInfoChange("dates1", e.target.value)}
                className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 font-bold text-right w-1/3"
              />
            </div>
            <div className="flex justify-between italic text-sm mb-2">
              <input 
                type="text" 
                value={personalInfo.role1 || jobTitle} 
                onChange={(e) => handleInfoChange("role1", e.target.value)}
                className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 italic w-1/2"
              />
              <input 
                type="text" 
                value={personalInfo.location1} 
                onChange={(e) => handleInfoChange("location1", e.target.value)}
                className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 italic text-right w-1/3"
              />
            </div>
            
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <textarea
                  value={data.b1}
                  onChange={(e) => handleDataChange("b1", e.target.value)}
                  rows={2}
                  className="w-full bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 resize-none"
                />
              </li>
              <li>
                <textarea
                  value={data.b2}
                  onChange={(e) => handleDataChange("b2", e.target.value)}
                  rows={2}
                  className="w-full bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 resize-none"
                />
              </li>
              <li>
                <textarea
                  value={data.b3}
                  onChange={(e) => handleDataChange("b3", e.target.value)}
                  rows={2}
                  className="w-full bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 resize-none"
                />
              </li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="mb-5">
            <div className="flex justify-between font-bold text-sm mb-1">
              <input 
                type="text" 
                value={personalInfo.company2} 
                onChange={(e) => handleInfoChange("company2", e.target.value)}
                className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 font-bold w-1/2"
              />
              <input 
                type="text" 
                value={personalInfo.dates2} 
                onChange={(e) => handleInfoChange("dates2", e.target.value)}
                className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 font-bold text-right w-1/3"
              />
            </div>
            <div className="flex justify-between italic text-sm mb-2">
              <input 
                type="text" 
                value={personalInfo.role2} 
                onChange={(e) => handleInfoChange("role2", e.target.value)}
                className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 italic w-1/2"
              />
              <input 
                type="text" 
                value={personalInfo.location2} 
                onChange={(e) => handleInfoChange("location2", e.target.value)}
                className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 italic text-right w-1/3"
              />
            </div>
            
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <textarea
                  value={personalInfo.bullet2_1}
                  onChange={(e) => handleInfoChange("bullet2_1", e.target.value)}
                  rows={2}
                  className="w-full bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 resize-none"
                />
              </li>
              <li>
                <textarea
                  value={personalInfo.bullet2_2}
                  onChange={(e) => handleInfoChange("bullet2_2", e.target.value)}
                  rows={2}
                  className="w-full bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 resize-none"
                />
              </li>
            </ul>
          </div>
        </div>

        {/* EDUCATION SECTION */}
        <div>
          <h3 className="font-bold text-lg uppercase tracking-wider mb-2 border-b-2 border-black">Education</h3>
          <div className="flex justify-between font-bold text-sm mb-1">
            <input 
              type="text" 
              value={personalInfo.school} 
              onChange={(e) => handleInfoChange("school", e.target.value)}
              className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 font-bold w-1/2"
            />
            <input 
              type="text" 
              value={personalInfo.gradDate} 
              onChange={(e) => handleInfoChange("gradDate", e.target.value)}
              className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 font-bold text-right w-1/3"
            />
          </div>
          <div className="flex justify-between text-sm">
            <input 
              type="text" 
              value={personalInfo.degree} 
              onChange={(e) => handleInfoChange("degree", e.target.value)}
              className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 w-1/2"
            />
            <input 
              type="text" 
              value={personalInfo.gpa} 
              onChange={(e) => handleInfoChange("gpa", e.target.value)}
              className="bg-transparent focus:outline-none focus:bg-neo-secondary/30 p-1 text-right w-1/3"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
