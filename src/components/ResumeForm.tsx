import React, { useState } from "react";
import { SearchParams, TemplateStyle } from "../types";
import { Sliders, Tag, Target, RefreshCw, Star, Upload } from "lucide-react";

interface ResumeFormProps {
  params: SearchParams;
  setParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  templateStyle: TemplateStyle;
  setTemplateStyle: (style: TemplateStyle) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  isParsing: boolean;
  onParseResume: (file: File) => void;
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
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card-neo p-8 bg-neo-secondary/20 relative overflow-hidden -rotate-1">
      <div className="absolute top-0 right-0 p-4">
        <Star size={32} strokeWidth={3} className="text-neo-accent" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-neo-accent p-2 border-4 border-black shadow-neo-sm rotate-3">
          <Sliders size={28} strokeWidth={3} className="text-white" />
        </div>
        <h2 className="font-heading font-black text-4xl uppercase">
          Target Job
        </h2>
      </div>

      {/* Upload Resume Button */}
      <div className="mb-8">
        <p className="font-bold uppercase mb-2">Have an existing resume?</p>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="btn-neo w-full py-4 px-6 bg-white text-black hover:bg-neo-secondary flex items-center justify-center gap-2"
        >
          <Upload size={20} strokeWidth={3} /> UPLOAD RESUME
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <label className="block font-black uppercase mb-2 flex items-center gap-2">
            <Target size={16} strokeWidth={3} /> Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            value={params.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Senior Software Engineer"
            className="w-full bg-white border-4 border-black p-4 font-bold placeholder:text-black/40 focus:bg-neo-secondary focus:shadow-neo-sm focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-black uppercase mb-2">Industry</label>
            <input
              type="text"
              name="industry"
              value={params.industry}
              onChange={handleChange}
              placeholder="e.g. Technology"
              className="w-full bg-white border-4 border-black p-4 font-bold placeholder:text-black/40 focus:bg-neo-muted focus:shadow-neo-sm focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-black uppercase mb-2">Experience</label>
            <select
              name="experienceLevel"
              value={params.experienceLevel}
              onChange={handleChange}
              className="w-full bg-white border-4 border-black p-4 font-bold focus:bg-neo-accent focus:shadow-neo-sm focus:outline-none transition-colors appearance-none rounded-none"
            >
              <option value="Entry-Level">Entry-Level (0-2 years)</option>
              <option value="Mid-Level">Mid-Level (3-5 years)</option>
              <option value="Senior-Level">Senior-Level (6-10 years)</option>
              <option value="Executive-Level">Executive-Level (10+ years)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-black uppercase mb-2">Core Skills</label>
          <input
            type="text"
            name="currentSkills"
            value={params.currentSkills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, Agile"
            className="w-full bg-white border-4 border-black p-4 font-bold placeholder:text-black/40 focus:bg-neo-secondary focus:shadow-neo-sm focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block font-black uppercase mb-2">Extra Context</label>
          <textarea
            name="additionalContext"
            value={params.additionalContext}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. Emphasize my leadership..."
            className="w-full bg-white border-4 border-black p-4 font-bold placeholder:text-black/40 focus:bg-neo-muted focus:shadow-neo-sm focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={!params.jobTitle || isGenerating}
        className="btn-neo w-full mt-8 bg-neo-accent py-4 text-xl flex items-center justify-center gap-3 text-black disabled:opacity-50 disabled:bg-gray-300"
      >
        {isGenerating ? <RefreshCw className="animate-spin" size={24} strokeWidth={3} /> : <Star size={24} strokeWidth={3} />}
        {isGenerating ? "GENERATING..." : "GENERATE ATS RESUME"}
      </button>

      {/* Upload Dialog Overlay */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neo-fg/80">
          <div className="card-neo bg-neo-muted p-8 max-w-2xl w-full relative">
            <h2 className="font-heading text-4xl font-black uppercase mb-4 text-stroke">
              UPLOAD <span className="text-black" style={{ WebkitTextStroke: '0' }}>RESUME</span>
            </h2>
            <p className="font-bold mb-6">
              Upload your existing resume (PDF or TXT). Our AI engine will analyze it and pre-fill the application fields.
            </p>
            
            <div className="relative mb-6 group cursor-pointer border-4 border-dashed border-black bg-white p-8 text-center hover:bg-neo-secondary transition-colors h-40 flex flex-col justify-center items-center">
              <input 
                type="file" 
                accept=".pdf,.txt"
                onChange={(e) => {
                   if (e.target.files && e.target.files[0]) {
                     setResumeFile(e.target.files[0]);
                   }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload size={32} strokeWidth={3} className="mb-2" />
              <span className="font-bold text-lg">
                {resumeFile ? resumeFile.name : "DRAG AND DROP OR CLICK TO BROWSE"}
              </span>
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => { setIsDialogOpen(false); setResumeFile(null); }}
                className="btn-neo px-6 py-3 bg-white"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  if (resumeFile) {
                    onParseResume(resumeFile);
                    setIsDialogOpen(false);
                    setResumeFile(null);
                  }
                }}
                disabled={!resumeFile || isParsing}
                className="btn-neo px-8 py-3 bg-neo-accent flex items-center gap-2 disabled:opacity-50"
              >
                {isParsing ? <RefreshCw className="animate-spin" size={20} strokeWidth={3} /> : <Star size={20} strokeWidth={3} />}
                {isParsing ? "ANALYZING..." : "ANALYZE RESUME"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
