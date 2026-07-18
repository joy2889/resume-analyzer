import React from "react";
import { TemplateStyle } from "../types";

interface TemplateMiniPreviewProps {
  style: TemplateStyle;
  isSelected: boolean;
}

export const TemplateMiniPreview: React.FC<TemplateMiniPreviewProps> = ({ style, isSelected }) => {
  const isModern = style === "ats-modern";

  return (
    <div className={`w-32 h-40 bg-white border-4 transition-all duration-300 relative overflow-hidden flex flex-col p-2 ${isSelected ? 'border-[#FF3AF2] shadow-multi scale-110 rotate-2' : 'border-slate-300 hover:border-[#00F5D4]'}`}>
      {/* Header section */}
      <div className={`w-full ${isModern ? 'text-left' : 'text-center'} mb-2`}>
        <div className={`h-2 bg-slate-800 mb-1 ${isModern ? 'w-3/4' : 'w-1/2 mx-auto'}`} />
        <div className={`h-1 bg-slate-400 ${isModern ? 'w-1/2' : 'w-1/3 mx-auto'}`} />
      </div>

      <div className="flex-1 flex flex-col gap-1.5 mt-2">
        {/* Section 1 */}
        <div>
          <div className="h-1.5 bg-slate-600 w-1/3 mb-1" />
          <div className="space-y-0.5">
            <div className="h-1 bg-slate-200 w-full" />
            <div className="h-1 bg-slate-200 w-5/6" />
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <div className="h-1.5 bg-slate-600 w-1/3 mb-1" />
          <div className="space-y-0.5">
            <div className="h-1 bg-slate-200 w-full" />
            <div className="h-1 bg-slate-200 w-11/12" />
            <div className="h-1 bg-slate-200 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
};
