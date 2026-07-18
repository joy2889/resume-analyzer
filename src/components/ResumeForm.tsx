/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Paper, 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Stack, 
  Chip,
  CircularProgress
} from "@mui/material";
import { SearchParams, TemplateStyle } from "../types";
import { 
  Briefcase, 
  Sparkles, 
  SlidersHorizontal, 
  Layers, 
  HelpCircle, 
  Compass, 
  CheckCircle,
  FileCheck
} from "lucide-react";

interface ResumeFormProps {
  params: SearchParams;
  setParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  templateStyle: TemplateStyle;
  setTemplateStyle: (style: TemplateStyle) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onQuickFill: (role: "software" | "marketing" | "healthcare" | "product") => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  params,
  setParams,
  templateStyle,
  setTemplateStyle,
  isGenerating,
  onGenerate,
  onQuickFill,
}) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      
      {/* Target Context Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid", borderColor: "divider", pb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SlidersHorizontal size={16} className="text-slate-500" />
          <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.secondary", letterSpacing: "0.5px" }}>
            1. Target Context
          </Typography>
        </Box>
        <Chip 
          icon={<FileCheck size={12} />} 
          label="AI Engine Active" 
          size="small" 
          color="info" 
          variant="outlined" 
          sx={{ height: 22, fontSize: "9px", fontWeight: "bold" }}
        />
      </Box>

      {/* Quick Demo Presets */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.secondary", display: "block", mb: 1, letterSpacing: "0.5px" }}>
          Quick Demo Presets
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => onQuickFill("software")}
            sx={{ justifySelf: "stretch", fontSize: "11px", py: 0.75, color: "text.primary", borderColor: "divider" }}
          >
            💻 Software
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => onQuickFill("marketing")}
            sx={{ justifySelf: "stretch", fontSize: "11px", py: 0.75, color: "text.primary", borderColor: "divider" }}
          >
            📈 Marketing
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => onQuickFill("product")}
            sx={{ justifySelf: "stretch", fontSize: "11px", py: 0.75, color: "text.primary", borderColor: "divider" }}
          >
            🚀 Product
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => onQuickFill("healthcare")}
            sx={{ justifySelf: "stretch", fontSize: "11px", py: 0.75, color: "text.primary", borderColor: "divider" }}
          >
            🏥 Healthcare
          </Button>
        </Box>
      </Box>

      {/* Inputs Stack */}
      <Stack spacing={2.5}>
        
        {/* Job Title */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5 }}>
              <Briefcase size={12} /> Job Title <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "8px", textTransform: "uppercase" }}>
              e.g. Architect
            </Typography>
          </Box>
          <TextField
            id="jobTitle-input"
            fullWidth
            size="small"
            name="jobTitle"
            placeholder="Enter target job title"
            value={params.jobTitle}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ "& .MuiInputBase-root": { fontSize: "13px" } }}
          />
        </Box>

        {/* Industry */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5 }}>
              <Compass size={12} /> Industry
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "8px", textTransform: "uppercase" }}>
              e.g. Technology
            </Typography>
          </Box>
          <TextField
            id="industry-input"
            fullWidth
            size="small"
            name="industry"
            placeholder="Enter target industry"
            value={params.industry}
            onChange={handleChange}
            variant="outlined"
            sx={{ "& .MuiInputBase-root": { fontSize: "13px" } }}
          />
        </Box>

        {/* Experience Level */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", display: "block", mb: 0.75 }}>
            Experience Level
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              id="experienceLevel-select"
              name="experienceLevel"
              value={params.experienceLevel}
              onChange={handleChange}
              sx={{ fontSize: "13px" }}
            >
              <MenuItem value="Entry-Level">Entry-Level (0-2 years)</MenuItem>
              <MenuItem value="Mid-Level">Mid-Level (2-5 years)</MenuItem>
              <MenuItem value="Senior-Level">Senior-Level (5+ years)</MenuItem>
              <MenuItem value="Executive-Level">Executive & Director (10+ years)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Current Skills (Optional) */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.75 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
              Your Current Skills
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "9px" }}>
              (Optional)
            </Typography>
          </Box>
          <TextField
            id="currentSkills-input"
            fullWidth
            size="small"
            name="currentSkills"
            placeholder="React, SQL, leadership, Agile..."
            value={params.currentSkills}
            onChange={handleChange}
            variant="outlined"
            sx={{ "& .MuiInputBase-root": { fontSize: "13px" } }}
          />
        </Box>

        {/* Additional Context */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.75 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
              Special Focus / Context
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "9px" }}>
              (Optional)
            </Typography>
          </Box>
          <TextField
            id="additionalContext-input"
            fullWidth
            multiline
            rows={2}
            size="small"
            name="additionalContext"
            placeholder="e.g. Emphasize legacy migration or remote team leadership..."
            value={params.additionalContext}
            onChange={handleChange}
            variant="outlined"
            sx={{ "& .MuiInputBase-root": { fontSize: "13px" } }}
          />
        </Box>

        {/* Select Template Style */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5, mb: 0.75 }}>
            <Layers size={12} /> Resume Template Style
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              id="templateStyle-select"
              value={templateStyle}
              onChange={(e) => setTemplateStyle(e.target.value as TemplateStyle)}
              sx={{ fontSize: "13px" }}
            >
              <MenuItem value="ats-traditional">Traditional (Highest ATS Times font)</MenuItem>
              <MenuItem value="ats-modern">Modern (Standard Arial layout)</MenuItem>
              <MenuItem value="ats-executive">Executive Elegant (Garamond style)</MenuItem>
              <MenuItem value="ats-clean">Clean Minimalist (Left-aligned look)</MenuItem>
            </Select>
          </FormControl>
        </Box>

      </Stack>

      {/* Generate Button */}
      <Button
        id="btn-generate-ai"
        variant="contained"
        color="secondary"
        onClick={onGenerate}
        disabled={isGenerating || !params.jobTitle}
        fullWidth
        sx={{ py: 1.25, fontWeight: "bold" }}
        startIcon={isGenerating ? <CircularProgress size={16} color="inherit" /> : <Sparkles size={16} />}
      >
        {isGenerating ? "Optimizing Content..." : "Generate ATS Content"}
      </Button>

      {/* ATS Info Banner */}
      <Box sx={{ bgcolor: "blue.50", border: "1px solid", borderColor: "blue.100", p: 1.5, borderRadius: "4px", display: "flex", gap: 1.5, alignItems: "start" }}>
        <HelpCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.4, fontSize: "0.7rem" }}>
          <strong>Why ATS matters:</strong> Over 95% of Fortune 500 companies use an Applicant Tracking System. Our builder uses clean formatting with keyword matching to maximize score rates.
        </Typography>
      </Box>

    </Paper>
  );
};
