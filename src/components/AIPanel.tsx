/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Paper, 
  Box, 
  Typography, 
  Stack, 
  Chip, 
  Grid 
} from "@mui/material";
import { ResumeData } from "../types";
import { 
  Sparkles, 
  Lightbulb, 
  AlertTriangle, 
  CheckSquare, 
  Tag, 
  ThumbsUp, 
  ShieldAlert,
  TrendingUp
} from "lucide-react";

interface AIPanelProps {
  data: ResumeData;
  hasGenerated: boolean;
  jobTitle: string;
}

export const AIPanel: React.FC<AIPanelProps> = ({
  data,
  hasGenerated,
  jobTitle,
}) => {
  // Determine color theme based on the score
  const getScoreColorClass = (score: number) => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-100 ring-emerald-500/10";
    if (score >= 70) return "text-amber-600 bg-amber-50 border-amber-100 ring-amber-500/10";
    return "text-rose-600 bg-rose-50 border-rose-100 ring-rose-500/10";
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "success.main";
    if (score >= 70) return "warning.main";
    return "error.main";
  };

  const ringColor = getScoreColor(data.atsScore);

  // Circumference for circular progress bar (r=24) -> 2 * PI * 24 = 150.79
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.atsScore / 100) * circumference;

  return (
    <Stack spacing={3} sx={{ transition: "all 0.3s ease", opacity: hasGenerated ? 1 : 0.85, textAlign: "left" }}>
      
      {/* ATS Score Gauge Card */}
      <Paper sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 3 }}>
        {/* Radial Progress Ring */}
        <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              className="stroke-slate-100"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={hasGenerated ? strokeDashoffset : circumference}
              strokeLinecap="round"
              style={{
                stroke: data.atsScore >= 85 ? "#10b981" : data.atsScore >= 70 ? "#f59e0b" : "#f43f5e",
                transition: "stroke-dashoffset 1s ease-out"
              }}
            />
          </svg>
          <Typography variant="body2" sx={{ position: "absolute", fontWeight: "bold", color: "text.primary" }}>
            {data.atsScore}%
          </Typography>
        </Box>

        {/* Feedback Description */}
        <Stack spacing={0.5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TrendingUp size={14} className="text-blue-600" />
            <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.secondary", letterSpacing: "0.5px" }}>
              ATS Compliance Rating
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.4, display: "block" }}>
            {data.atsScore >= 85 
              ? "Excellent keywords match! This resume ranks in the top tier for parsers like Taleo or Greenhouse."
              : data.atsScore >= 70 
              ? "Good start. Add more industry keywords and quantitative achievements to unlock 85+ score."
              : "Action required. Critical sections are lacking role-specific action verbs or measurable metrics."}
          </Typography>
        </Stack>
      </Paper>

      {/* AI Suggestions Box */}
      <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, borderBottom: "1px solid", borderColor: "divider", pb: 1.5 }}>
          <Sparkles size={16} className="text-blue-600" />
          <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.secondary", letterSpacing: "0.5px" }}>
            2. AI Optimization Engine
          </Typography>
        </Box>

        {/* High-Impact Verbs */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "secondary.main", display: "block", mb: 1, letterSpacing: "0.5px" }}>
            Power Verbs
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {data.actionVerbs.map((verb, idx) => (
              <Chip 
                key={idx} 
                label={verb} 
                size="small" 
                variant="outlined" 
                color="secondary"
                sx={{ height: 24, fontSize: "11px", fontWeight: "medium" }}
              />
            ))}
          </Box>
        </Box>

        {/* Achievements XYZ guidelines */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "secondary.main", display: "block", mb: 1, letterSpacing: "0.5px" }}>
            Achievement Framing (XYZ)
          </Typography>
          <Box sx={{ bgcolor: "blue.50", border: "1px solid", borderColor: "blue.100", p: 1.75, borderRadius: "4px" }}>
            <Typography variant="caption" sx={{ color: "blue.900", display: "block", fontStyle: "italic", lineHeight: 1.4 }}>
              "{data.achievements}"
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Keyword Optimization Cards */}
      <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, borderBottom: "1px solid", borderColor: "divider", pb: 1.5 }}>
          <Tag size={16} className="text-emerald-600" />
          <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.secondary", letterSpacing: "0.5px" }}>
            3. ATS Keyword Density
          </Typography>
        </Box>
        
        <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.4, display: "block" }}>
          Incorporate these critical high-scoring key phrases naturally inside your summary and experiences:
        </Typography>
        
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
          {data.keywords.map((kw, idx) => (
            <Box 
              key={idx} 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1, 
                bgcolor: "background.default", 
                border: "1px solid", 
                borderColor: "divider", 
                px: 1.5, 
                py: 1, 
                borderRadius: "4px" 
              }}
            >
              <Typography variant="caption" sx={{ color: "emerald.500", fontWeight: "bold" }}>✓</Typography>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {kw}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* ATS Actionable Checklist */}
      <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, borderBottom: "1px solid", borderColor: "divider", pb: 1.5 }}>
          <CheckSquare size={16} className="text-purple-600" />
          <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.secondary", letterSpacing: "0.5px" }}>
            4. Recommended Adjustments
          </Typography>
        </Box>
        
        <Stack spacing={1.5}>
          {data.atsFeedback.map((tip, idx) => (
            <Box key={idx} sx={{ display: "flex", gap: 1.25, alignItems: "start" }}>
              <Typography variant="caption" sx={{ color: "purple.500", fontWeight: "bold", mt: 0.25 }}>•</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "medium", lineHeight: 1.4 }}>
                {tip}
              </Typography>
            </Box>
          ))}
          
          <Box sx={{ display: "flex", gap: 1.25, alignItems: "start" }}>
            <Typography variant="caption" sx={{ color: "purple.500", fontWeight: "bold", mt: 0.25 }}>•</Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "medium", lineHeight: 1.4 }}>
              Export in clean PDF format using Chrome's native save tool (A4 or Letter layout, single-page limit strongly advised).
            </Typography>
          </Box>
        </Stack>
      </Paper>

    </Stack>
  );
};
