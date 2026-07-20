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
    <div className="glass-panel p-8 bg-white/10  relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <Sparkles size={32} strokeWidth={3} className="text-purple-400" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white/10 p-2 border border-white/10 shadow-lg ">
          <Sparkles size={28} strokeWidth={3} className="text-white" />
        </div>
        <h2 className="font-display font-bold text-4xl uppercase">
          AI Insights
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 mb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-indigo-600 rounded-full border border-white/10 flex items-center justify-center shadow-lg">
            <span className="font-display font-bold text-2xl text-white">{resumeData.atsScore}</span>
          </div>
          <div>
            <h3 className="font-bold text-xl uppercase tracking-wider">Estimated Score</h3>
            <p className="font-bold text-sm text-white/70">Based on keyword density & formatting</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 h-4 border border-white/10 overflow-hidden mt-4">
          <div 
            className="h-full bg-indigo-600"
            style={{ width: `${resumeData.atsScore}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-display text-2xl font-bold uppercase flex items-center gap-2">
          <Lightbulb size={24} strokeWidth={3} /> Review Notes
        </h4>
        
        <div className="space-y-3">
          {resumeData.atsFeedback.map((feedback, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-4 flex gap-4 items-start shadow-lg ">
              <CheckCircle2 className="text-indigo-400 shrink-0 mt-0.5" size={24} strokeWidth={3} />
              <p className="font-bold text-lg">{feedback}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white/10 border border-white/10 p-4 flex gap-4 items-start shadow-lg ">
        <AlertTriangle className="text-white shrink-0 mt-1" size={24} strokeWidth={3} />
        <div>
          <h5 className="font-bold uppercase mb-1">Human Review Required</h5>
          <p className="text-sm font-bold">
            AI outputs are estimates. Please review all generated text for accuracy and ensure it truthfully represents your experience before submitting.
          </p>
        </div>
      </div>
    </div>
  );
};
