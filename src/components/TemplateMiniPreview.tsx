/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Box } from "@mui/material";
import { TemplateStyle } from "../types";

interface TemplateMiniPreviewProps {
  style: TemplateStyle;
  isSelected: boolean;
}

export const TemplateMiniPreview: React.FC<TemplateMiniPreviewProps> = ({
  style,
  isSelected,
}) => {
  // Render content according to the style
  const renderTraditional = () => {
    return (
      <div className="flex flex-col gap-2.5 h-full w-full font-serif text-[6px] text-neutral-800">
        {/* Header - Centered */}
        <div className="text-center flex flex-col items-center gap-0.5 border-b border-neutral-300 pb-1">
          <div className="w-16 h-1.5 bg-neutral-900 rounded-xs font-bold uppercase tracking-wider text-center flex items-center justify-center text-[5px]">
            ALEX JOHNSON
          </div>
          <div className="w-24 h-1 bg-neutral-400 rounded-xs"></div>
        </div>

        {/* Section 1 - Summary */}
        <div className="flex flex-col gap-1">
          <div className="border-b border-neutral-500 pb-0.5 font-bold uppercase tracking-wide text-neutral-800 text-[5px]">
            Professional Summary
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="w-full h-1 bg-neutral-300 rounded-xs"></div>
            <div className="w-[95%] h-1 bg-neutral-300 rounded-xs"></div>
            <div className="w-[85%] h-1 bg-neutral-300 rounded-xs"></div>
          </div>
        </div>

        {/* Section 2 - Skills */}
        <div className="flex flex-col gap-1">
          <div className="border-b border-neutral-500 pb-0.5 font-bold uppercase tracking-wide text-neutral-800 text-[5px]">
            Core Competencies
          </div>
          <div className="flex gap-1.5 justify-center py-0.5">
            <div className="w-8 h-1 bg-neutral-400 rounded-xs"></div>
            <div className="w-10 h-1 bg-neutral-400 rounded-xs"></div>
            <div className="w-7 h-1 bg-neutral-400 rounded-xs"></div>
          </div>
        </div>

        {/* Section 3 - Experience */}
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="border-b border-neutral-500 pb-0.5 font-bold uppercase tracking-wide text-neutral-800 text-[5px]">
            Professional Experience
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="w-12 h-1 bg-neutral-800 rounded-xs font-bold"></div>
              <div className="w-8 h-1 bg-neutral-400 rounded-xs"></div>
            </div>
            <div className="flex flex-col gap-0.5 pl-1.5 border-l border-neutral-200">
              <div className="flex items-start gap-1">
                <div className="w-0.5 h-0.5 rounded-full bg-neutral-600 mt-0.5 shrink-0"></div>
                <div className="w-full h-1 bg-neutral-300 rounded-xs"></div>
              </div>
              <div className="flex items-start gap-1">
                <div className="w-0.5 h-0.5 rounded-full bg-neutral-600 mt-0.5 shrink-0"></div>
                <div className="w-[90%] h-1 bg-neutral-300 rounded-xs"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderModern = () => {
    return (
      <div className="flex flex-col gap-2.5 h-full w-full font-sans text-[6px] text-neutral-800">
        {/* Header - Left Aligned with Blue Accent Bar */}
        <div className="border-l-2 border-blue-600 pl-1.5 py-0.5 flex flex-col gap-0.5">
          <div className="w-14 h-1.5 bg-neutral-900 rounded-xs font-black text-[5px]">
            ALEX JOHNSON
          </div>
          <div className="w-20 h-1 bg-neutral-400 rounded-xs"></div>
        </div>

        {/* Section 1 - Summary */}
        <div className="flex flex-col gap-1">
          <div className="border-b border-neutral-200 pb-0.5 font-bold uppercase tracking-wider text-neutral-700 text-[4.5px]">
            Professional Summary
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="w-full h-1 bg-neutral-300 rounded-xs"></div>
            <div className="w-[95%] h-1 bg-neutral-300 rounded-xs"></div>
          </div>
        </div>

        {/* Section 2 - Competencies */}
        <div className="flex flex-col gap-1">
          <div className="border-b border-neutral-200 pb-0.5 font-bold uppercase tracking-wider text-neutral-700 text-[4.5px]">
            Core Competencies
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="h-2 bg-neutral-100 border border-neutral-200 rounded-xs flex items-center justify-center text-[3.5px] px-0.5 text-neutral-600 font-medium">Skill</div>
            <div className="h-2 bg-neutral-100 border border-neutral-200 rounded-xs flex items-center justify-center text-[3.5px] px-0.5 text-neutral-600 font-medium">Skill</div>
            <div className="h-2 bg-neutral-100 border border-neutral-200 rounded-xs flex items-center justify-center text-[3.5px] px-0.5 text-neutral-600 font-medium">Skill</div>
          </div>
        </div>

        {/* Section 3 - Experience */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="border-b border-neutral-200 pb-0.5 font-bold uppercase tracking-wider text-neutral-700 text-[4.5px]">
            Professional Experience
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="w-16 h-1.5 bg-blue-900/10 rounded-xs border border-blue-100"></div>
              <div className="w-10 h-1 bg-neutral-400 rounded-xs"></div>
            </div>
            <div className="flex flex-col gap-0.5 pl-1.5 border-l-2 border-blue-200">
              <div className="w-full h-1 bg-neutral-300 rounded-xs"></div>
              <div className="w-[92%] h-1 bg-neutral-300 rounded-xs"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExecutive = () => {
    return (
      <div className="flex flex-col gap-2.5 h-full w-full font-serif text-[6px] text-neutral-800">
        {/* Header - Double Border Accent */}
        <div className="text-center flex flex-col items-center gap-0.5 border-b-2 border-double border-neutral-400 pb-1.5">
          <div className="w-20 h-1.5 bg-neutral-900 rounded-xs font-semibold tracking-widest text-[5px]">
            ALEX JOHNSON
          </div>
          <div className="w-28 h-1 bg-neutral-400 rounded-xs"></div>
        </div>

        {/* Section 1 - Summary */}
        <div className="flex flex-col gap-1">
          <div className="border-b border-neutral-300 pb-0.5 font-semibold uppercase tracking-widest text-neutral-900 text-[4.5px]">
            Professional Summary
          </div>
          <div className="flex flex-col gap-0.5 italic">
            <div className="w-full h-1 bg-neutral-300/85 rounded-xs"></div>
            <div className="w-[96%] h-1 bg-neutral-300/85 rounded-xs"></div>
          </div>
        </div>

        {/* Section 2 - Core Competencies */}
        <div className="flex flex-col gap-1">
          <div className="border-b border-neutral-300 pb-0.5 font-semibold uppercase tracking-widest text-neutral-900 text-[4.5px]">
            Core Competencies
          </div>
          <div className="flex justify-around py-0.5">
            <div className="w-10 h-1 bg-neutral-400 rounded-xs"></div>
            <div className="w-8 h-1 bg-neutral-400 rounded-xs"></div>
            <div className="w-9 h-1 bg-neutral-400 rounded-xs"></div>
          </div>
        </div>

        {/* Section 3 - Experience */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="border-b border-neutral-300 pb-0.5 font-semibold uppercase tracking-widest text-neutral-900 text-[4.5px]">
            Professional Experience
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="w-14 h-1 bg-neutral-800 rounded-xs font-bold"></div>
              <div className="w-12 h-1 bg-neutral-400 rounded-xs"></div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="w-full h-1 bg-neutral-300 rounded-xs"></div>
              <div className="w-[88%] h-1 bg-neutral-300 rounded-xs"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderClean = () => {
    return (
      <div className="flex flex-col gap-2.5 h-full w-full font-sans text-[6px] text-neutral-800">
        {/* Header - Symmetrical & Centered */}
        <div className="text-center flex flex-col items-center gap-0.5 pb-1">
          <div className="w-16 h-1.5 bg-neutral-900 rounded-xs font-bold tracking-widest text-[5.5px]">
            ALEX JOHNSON
          </div>
          <div className="w-24 h-1 bg-neutral-400 rounded-xs"></div>
        </div>

        {/* Section 1 - Summary */}
        <div className="flex flex-col gap-1">
          <div className="font-bold text-blue-700 tracking-widest text-[4.5px] uppercase">
            Professional Summary
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="w-[98%] h-1 bg-neutral-300 rounded-xs"></div>
            <div className="w-[92%] h-1 bg-neutral-300 rounded-xs"></div>
          </div>
        </div>

        {/* Section 2 - Core Competencies */}
        <div className="flex flex-col gap-1">
          <div className="font-bold text-blue-700 tracking-widest text-[4.5px] uppercase">
            Core Competencies
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="w-7 h-1 bg-neutral-300 rounded-xs"></div>
            <div className="w-8 h-1 bg-neutral-300 rounded-xs"></div>
            <div className="w-6 h-1 bg-neutral-300 rounded-xs"></div>
            <div className="w-9 h-1 bg-neutral-300 rounded-xs"></div>
          </div>
        </div>

        {/* Section 3 - Experience */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="font-bold text-blue-700 tracking-widest text-[4.5px] uppercase">
            Professional Experience
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="w-12 h-1 bg-neutral-800 rounded-xs"></div>
              <div className="w-8 h-1 bg-neutral-400 rounded-xs"></div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="w-[96%] h-1 bg-neutral-300 rounded-xs"></div>
              <div className="w-[90%] h-1 bg-neutral-300 rounded-xs"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "150px",
        aspectRatio: "3/4.2",
        mx: "auto",
        p: 1.5,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: isSelected ? "secondary.main" : "divider",
        borderRadius: "8px",
        boxShadow: isSelected 
          ? "0 4px 12px rgba(99, 102, 241, 0.15)" 
          : "0 2px 6px rgba(0, 0, 0, 0.03)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: isSelected ? "secondary.main" : "neutral.400",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
        },
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Mini resume content */}
      {style === "ats-traditional" && renderTraditional()}
      {style === "ats-modern" && renderModern()}
      {style === "ats-executive" && renderExecutive()}
      {style === "ats-clean" && renderClean()}

      {/* Selected Indicator Badge */}
      {isSelected && (
        <div className="absolute top-1 right-1 w-3 h-3 bg-indigo-600 rounded-full flex items-center justify-center text-[7px] text-white font-bold shadow-sm">
          ✓
        </div>
      )}
    </Box>
  );
};
