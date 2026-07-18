import React from "react";
import { ResumeData } from "../types";
import { Sparkles, Lightbulb, CheckCircle2, AlertTriangle, MessageSquare } from "lucide-react";

interface AIPanelProps {
  hasGenerated: boolean;
  resumeData: ResumeData | null;
}

export const AIPanel: React.FC<AIPanelProps> = ({ hasGenerated, resumeData }) => {
  if (!hasGenerated || !resumeData) return null;

  return (
    <div className="bg-[#2D1B4E]/80 backdrop-blur border-8 border-[#00F5D4] rounded-3xl p-8 shadow-multi relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pattern-stripes opacity-10 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#FF3AF2] p-3 rounded-xl border-4 border-[#FFE600] -rotate-3 shadow-[4px_4px_0_#00F5D4]">
            <Sparkles size={28} className="text-[#0D0D1A]" />
          </div>
          <h2 className="font-heading font-black text-4xl uppercase text-shadow-single">
            AI <span className="text-[#FF6B35]">Insights</span>
          </h2>
        </div>

        <div className="bg-[#0D0D1A]/50 border-4 border-dashed border-[#FF3AF2] rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#FFE600] rounded-full border-4 border-[#FF6B35] flex items-center justify-center shadow-[0_0_20px_rgba(255,230,0,0.4)]">
              <span className="font-heading font-black text-2xl text-[#0D0D1A]">{resumeData.atsScore}</span>
            </div>
            <div>
              <h3 className="font-bold text-white text-xl uppercase tracking-wider">Estimated ATS Score</h3>
              <p className="text-[#00F5D4] font-bold text-sm">Based on keyword density & formatting</p>
            </div>
          </div>
          
          <div className="w-full bg-[#0D0D1A] h-4 rounded-full border-2 border-[#FF3AF2] overflow-hidden mt-4">
            <div 
              className="h-full bg-gradient-to-r from-[#FF3AF2] to-[#00F5D4] rounded-full"
              style={{ width: `${resumeData.atsScore}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-heading text-2xl font-black uppercase text-[#FFE600] flex items-center gap-2">
            <Lightbulb size={24} /> Review Notes
          </h4>
          
          <div className="space-y-3">
            {resumeData.atsFeedback.map((feedback, idx) => (
              <div key={idx} className="bg-[#0D0D1A] border-2 border-[#00F5D4] rounded-xl p-4 flex gap-4 items-start">
                <CheckCircle2 className="text-[#00F5D4] shrink-0 mt-0.5" size={20} />
                <p className="text-white/90 font-medium">{feedback}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-[#FF6B35]/20 border-4 border-[#FF6B35] rounded-xl p-4 flex gap-4 items-start">
          <AlertTriangle className="text-[#FFE600] shrink-0 mt-1" size={24} />
          <div>
            <h5 className="font-bold text-[#FFE600] uppercase mb-1">Human Review Required</h5>
            <p className="text-white/80 text-sm font-medium">
              AI outputs are estimates. Please review all generated text for accuracy and ensure it truthfully represents your experience before submitting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
