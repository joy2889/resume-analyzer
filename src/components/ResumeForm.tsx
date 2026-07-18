import React, { useState } from "react";
import { SearchParams, TemplateStyle } from "../types";
import { Sparkles, Sliders, Briefcase, Tag, Target, RefreshCw } from "lucide-react";

interface ResumeFormProps {
  params: SearchParams;
  setParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  templateStyle: TemplateStyle;
  setTemplateStyle: (style: TemplateStyle) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  isParsing: boolean;
  onParseResume: (text: string) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  params,
  setParams,
  isGenerating,
  onGenerate,
  isParsing,
  onParseResume,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resumeText, setResumeText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#2D1B4E]/80 backdrop-blur border-8 border-[#FF3AF2] rounded-3xl p-8 shadow-multi relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pattern-dots opacity-10 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#FFE600] p-3 rounded-xl border-4 border-[#00F5D4] rotate-3 shadow-[4px_4px_0_#FF3AF2]">
            <Sliders size={28} className="text-[#0D0D1A]" />
          </div>
          <h2 className="font-heading font-black text-4xl uppercase text-shadow-single">
            Target <span className="text-[#00F5D4]">Parameters</span>
          </h2>
        </div>

        {/* Scan Resume Button */}
        <div className="mb-8">
          <p className="font-bold text-[#FF6B35] uppercase mb-2">Have an existing resume?</p>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="w-full py-4 px-6 border-4 border-dashed border-[#00F5D4] text-white font-black uppercase rounded-2xl hover:bg-[#00F5D4] hover:text-[#0D0D1A] hover:border-solid hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Tag size={20} /> Paste Raw Text to Auto-Fill
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block font-bold text-[#FF3AF2] uppercase mb-2 flex items-center gap-2">
              <Target size={16} /> Target Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={params.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              className="w-full bg-[#0D0D1A] border-4 border-[#00F5D4] rounded-xl px-4 py-3 text-white font-bold placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-[#FF3AF2]/50 focus:border-[#FF3AF2] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-[#FFE600] uppercase mb-2">Industry</label>
              <input
                type="text"
                name="industry"
                value={params.industry}
                onChange={handleChange}
                placeholder="e.g. Technology"
                className="w-full bg-[#0D0D1A] border-4 border-[#00F5D4] rounded-xl px-4 py-3 text-white font-bold placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-[#FFE600]/50 focus:border-[#FFE600] transition-all"
              />
            </div>
            <div>
              <label className="block font-bold text-[#00F5D4] uppercase mb-2">Experience Level</label>
              <select
                name="experienceLevel"
                value={params.experienceLevel}
                onChange={handleChange}
                className="w-full bg-[#0D0D1A] border-4 border-[#00F5D4] rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-4 focus:ring-[#FF3AF2]/50 transition-all appearance-none"
              >
                <option value="Entry-Level">Entry-Level (0-2 years)</option>
                <option value="Mid-Level">Mid-Level (3-5 years)</option>
                <option value="Senior-Level">Senior-Level (6-10 years)</option>
                <option value="Executive-Level">Executive-Level (10+ years)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#FF6B35] uppercase mb-2">Core Competencies / Skills</label>
            <input
              type="text"
              name="currentSkills"
              value={params.currentSkills}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, Agile, Product Strategy"
              className="w-full bg-[#0D0D1A] border-4 border-[#00F5D4] rounded-xl px-4 py-3 text-white font-bold placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] transition-all"
            />
          </div>

          <div>
            <label className="block font-bold text-white uppercase mb-2">Custom Instructions / Context</label>
            <textarea
              name="additionalContext"
              value={params.additionalContext}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Emphasize my leadership experience and recent AWS certification."
              className="w-full bg-[#0D0D1A] border-4 border-[#00F5D4] rounded-xl px-4 py-3 text-white font-bold placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-[#FF3AF2]/50 focus:border-[#FF3AF2] transition-all"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={!params.jobTitle || isGenerating}
          className="w-full mt-8 bg-gradient-to-r from-[#FF3AF2] via-[#7B2FFF] to-[#00F5D4] border-4 border-[#FFE600] rounded-full py-4 text-xl font-black uppercase text-white shadow-multi hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3 glow-accent"
        >
          {isGenerating ? <RefreshCw className="animate-spin" size={24} /> : <Sparkles size={24} />}
          {isGenerating ? "Synthesizing Data..." : "Generate ATS Content"}
        </button>
      </div>

      {/* Parse Dialog Overlay (Tailwind modal) */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0D1A]/80 backdrop-blur-sm">
          <div className="bg-[#2D1B4E] border-8 border-[#00F5D4] rounded-3xl p-8 max-w-2xl w-full shadow-multi-lg relative pattern-checker overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-heading text-4xl font-black uppercase text-shadow-single text-[#FF3AF2] mb-4">
                Paste Your Resume
              </h2>
              <p className="text-white/80 font-bold mb-6">
                Paste the text content of your existing resume. Our AI engine will analyze it and pre-fill the application fields.
              </p>
              
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={10}
                className="w-full bg-[#0D0D1A] border-4 border-[#FFE600] rounded-xl p-4 text-white font-mono placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-[#FF3AF2]/50 mb-6"
                placeholder="Paste your text here..."
              />
              
              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setIsDialogOpen(false)}
                  className="px-6 py-3 font-bold uppercase text-white hover:bg-white/10 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onParseResume(resumeText);
                    setIsDialogOpen(false);
                  }}
                  disabled={!resumeText.trim() || isParsing}
                  className="px-8 py-3 bg-[#FF3AF2] border-4 border-[#00F5D4] font-black text-white uppercase rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-2 shadow-[4px_4px_0_#FFE600]"
                >
                  {isParsing ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                  {isParsing ? "Analyzing..." : "Analyze & Import"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
