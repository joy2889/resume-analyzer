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
    <div className="card-neo p-8 bg-neo-muted/30 rotate-1 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <Sparkles size={32} strokeWidth={3} className="text-neo-secondary" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-neo-secondary p-2 border-4 border-black shadow-neo-sm -rotate-3">
          <Sparkles size={28} strokeWidth={3} className="text-black" />
        </div>
        <h2 className="font-heading font-black text-4xl uppercase">
          AI Insights
        </h2>
      </div>

      <div className="bg-white border-4 border-black p-6 mb-8 shadow-neo-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-neo-accent rounded-full border-4 border-black flex items-center justify-center shadow-neo-sm">
            <span className="font-heading font-black text-2xl text-white">{resumeData.atsScore}</span>
          </div>
          <div>
            <h3 className="font-black text-xl uppercase tracking-wider">Estimated Score</h3>
            <p className="font-bold text-sm text-black/70">Based on keyword density & formatting</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 h-4 border-4 border-black overflow-hidden mt-4">
          <div 
            className="h-full bg-neo-accent"
            style={{ width: `${resumeData.atsScore}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-heading text-2xl font-black uppercase flex items-center gap-2">
          <Lightbulb size={24} strokeWidth={3} /> Review Notes
        </h4>
        
        <div className="space-y-3">
          {resumeData.atsFeedback.map((feedback, idx) => (
            <div key={idx} className="bg-white border-4 border-black p-4 flex gap-4 items-start shadow-neo-sm rotate-[0.5deg]">
              <CheckCircle2 className="text-neo-accent shrink-0 mt-0.5" size={24} strokeWidth={3} />
              <p className="font-bold text-lg">{feedback}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-neo-secondary border-4 border-black p-4 flex gap-4 items-start shadow-neo-sm -rotate-1">
        <AlertTriangle className="text-black shrink-0 mt-1" size={24} strokeWidth={3} />
        <div>
          <h5 className="font-black uppercase mb-1">Human Review Required</h5>
          <p className="text-sm font-bold">
            AI outputs are estimates. Please review all generated text for accuracy and ensure it truthfully represents your experience before submitting.
          </p>
        </div>
      </div>
    </div>
  );
};
