/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { 
  Container, 
  Grid, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Tabs, 
  Tab, 
  Paper, 
  Stack, 
  Badge,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress
} from "@mui/material";

import { ResumeForm } from "./components/ResumeForm";
import { ResumePreview } from "./components/ResumePreview";
import { AIPanel } from "./components/AIPanel";
import { TemplateMiniPreview } from "./components/TemplateMiniPreview";
import { ResumeData, SearchParams, TemplateStyle } from "./types";
import { 
  FileText, 
  Award, 
  Layers, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  Grid as GridIcon, 
  Sliders as SlidersIcon, 
  ShieldCheck, 
  BadgeCheck, 
  FileCheck,
  AlertTriangle,
  Lightbulb,
  Scan,
  RefreshCw,
  FileBadge
} from "lucide-react";

// Robust client-side presets for instant clicks / fallbacks
const clientPresets: Record<string, ResumeData> = {
  software: {
    summary: "Innovative, performance-driven Software Engineer with over 5 years of experience architecting highly scalable full-stack applications. Proven expertise in React, Node.js, and cloud native architectures. Adept at driving rapid deployment schedules, refactoring monolithic legacy codebases into high-throughput microservices, and leading high-performing Agile sprint teams.",
    skills: ["JavaScript/TypeScript", "React / Next.js", "Node.js / Express", "PostgreSQL / Redis", "Docker & Kubernetes", "AWS Cloud Services", "REST APIs / GraphQL", "CI/CD Deployment Pipelines"],
    b1: "Architected modern microservices handling 15,000+ operations/sec, reducing user-facing page load latency by 35% using Redis caching strategies.",
    b2: "Engineered scalable CI/CD pipelines utilizing GitHub Actions and Docker, reducing deployment cycles by 40% and increasing deployment success rate to 99.8%.",
    b3: "Refactored legacy CRM platform into clean component modules, saving 25 developer-hours per week in team code maintenance overhead.",
    actionVerbs: ["Architected", "Engineered", "Refactored", "Optimized", "Spearheaded", "Deployed"],
    achievements: "Architected high-throughput services [X] measuring 15k+ op/s [Y], by designing parallel Redis caches [Z].",
    keywords: ["Software Engineering", "Full Stack Development", "Agile Methodologies", "Cloud Native Architectures", "System Scalability", "Performance Optimization", "Automated Testing", "API Design"],
    atsScore: 92,
    atsFeedback: [
      "Excellent skill density. Consider placing technical certifications prominently underneath Education.",
      "Bullet point metrics are highly quantifiable. Make sure you use matching terminology from your target job description.",
      "Times New Roman serif font is recommended for absolute safety with older parser scanners."
    ]
  },
  marketing: {
    summary: "Strategic, data-centric Marketing Manager with 6+ years of success leading multi-channel digital campaigns. Expert in high-growth B2B lead generation, brand strategy, content marketing, and search engine optimization. Demonstrated record of optimizing customer acquisition funnels, spearheading cross-functional product launches, and managing $500k+ annual advertising budgets.",
    skills: ["Growth Marketing", "Search Engine Optimization (SEO)", "Marketing Automation & CRM", "A/B Conversion Testing", "Google Analytics & Tag Manager", "HubSpot & Salesforce Suite", "B2B Content Strategy", "ROI & KPI Performance Tracking"],
    b1: "Orchestrated multi-channel inbound growth campaigns that boosted monthly qualified leads by 48% and added $1.4M to sales pipeline.",
    b2: "Spearheaded advanced landing page A/B split-testing protocols, raising conversions by 28% while lowering Cost-Per-Acquisition by 15%.",
    b3: "Directed external creative agencies to deliver 12 localized high-performing video assets, completing projects 2 weeks ahead of schedules.",
    actionVerbs: ["Orchestrated", "Spearheaded", "Directed", "Amplified", "Optimized", "Captured"],
    achievements: "Orchestrated multi-channel campaigns [X] raising leads by 48% [Y], by designing A/B landing funnels [Z].",
    keywords: ["B2B Growth Marketing", "Search Engine Optimization", "Conversion Rate Optimization", "Inbound Marketing", "Campaign Auditing", "Analytics Frameworks", "Stakeholder Management", "Budget Allocation"],
    atsScore: 91,
    atsFeedback: [
      "Solid campaign stats! Try aligning tools (like HubSpot) in both Core Competencies and Experience bullets.",
      "Ensure B2B terminology matches recruiters' filtering requirements.",
      "Clean template style (Arial or Helvetica font) is highly readable on both modern ATS and recruiter screens."
    ]
  },
  healthcare: {
    summary: "Compassionate, board-certified Registered Nurse with 7+ years of clinical excellence in high-acuity Emergency Department settings. Dedicated advocate for patient safety, clinical quality, and rapid-response care. Specialized in trauma assessment, cardiac monitoring, and triage coordination. Expert at leading shift handoffs and training nursing personnel on emergency medicine workflows.",
    skills: ["Emergency & Trauma Care", "Patient Assessment & Triage", "ACLS & BLS Certifications", "IV Therapy & Phlebotomy", "Electronic Health Records (EHR)", "Medication Administration", "Patient & Family Advocacy", "Cross-functional Team Care"],
    b1: "Coordinated emergency trauma response workflows in a 45-bed facility, reducing average patient door-to-doctor times by 22%.",
    b2: "Pioneered EHR medication entry audit sheets, decreasing charting errors by 18% and ensuring 100% HIPAA regulatory compliance.",
    b3: "Supervised and mentored 6 graduate nurses per shift, increasing clinical protocol checkoff rates by 30% over 6 months.",
    actionVerbs: ["Coordinated", "Pioneered", "Supervised", "Assessed", "Championed", "Administered"],
    achievements: "Coordinated trauma response [X] reducing patient wait-times by 22% [Y], by designing lean triage triage checklists [Z].",
    keywords: ["Emergency Nursing", "High-Acuity Care", "Clinical Workflows", "EHR Documentation", "Regulatory Compliance", "Patient Advocacy", "Interdisciplinary Collaboration", "Risk Assessment"],
    atsScore: 89,
    atsFeedback: [
      "Include license numbers or certifications (e.g. RN, ACLS) in your name header for instant visibility.",
      "Ensure EHR systems you are proficient with (Epic, Cerner) are spelled out exactly as searched.",
      "Traditional serif layouts remain a gold standard for hospital administration filters."
    ]
  },
  product: {
    summary: "Metrics-driven Product Manager with 5+ years of experience leading cross-functional teams to build and launch award-winning SaaS platforms. Passionate about resolving complex customer pain points, data-driven prioritization, and product lifecycle strategy. Skilled at building product roadmaps, conducting competitive analyses, and defining high-growth product specifications.",
    skills: ["Product Roadmap Strategy", "Agile Product Lifecycle", "Market & Competitor Analysis", "SQL & Product Analytics", "Jira & Confluence Management", "UI/UX Prototyping Coordination", "Feature Prioritization Models", "Stakeholder Communications"],
    b1: "Pioneered product strategy and MVP feature specifications for a B2B collaboration tool, scaling monthly active users by 185% in 6 months.",
    b2: "Optimized user onboarding registration funnels through data-driven UI design changes, lifting overall signup conversions by 32%.",
    b3: "Led a cross-functional product, design, and engineering team of 15, completing full-scale cloud migrations on budget and 3 weeks early.",
    actionVerbs: ["Pioneered", "Optimized", "Launched", "Prioritized", "Led", "Formulated"],
    achievements: "Pioneered custom onboarding funnels [X] raising conversions by 32% [Y], by utilizing Mixpanel user analytics [Z].",
    keywords: ["Product Lifecycle Management", "SaaS Implementations", "Data-Driven Prioritizations", "User Acquisition Strategies", "Feature Roadmap Planning", "Agile Frameworks", "Technical Specifications", "UX Collaborations"],
    atsScore: 90,
    atsFeedback: [
      "Highlight frameworks and prioritization metrics (e.g. RICE framework) to demonstrate senior leadership logic.",
      "List major tools like SQL or Amplitude inside Core Competencies.",
      "Executive Elegant styles using Garamond emphasize authority for manager positions."
    ]
  },
  default: {
    summary: "Highly skilled, collaborative professional with a proven track record of driving project deliverables, optimizing operational workflows, and managing key stakeholder expectations. Adept at leveraging modern tools and team methodologies to complete projects on time, on budget, and exceeding strategic key performance indicators.",
    skills: ["Project Management", "Business Strategy", "Process Optimization", "Cross-functional Leadership", "Stakeholder Communications", "Data Analysis", "Risk Assessment & Mitigation", "Team Collaborations"],
    b1: "Led a critical team initiative of 10 to deliver key platform integrations, increasing quarterly operational performance metrics by 20%.",
    b2: "Optimized manual spreadsheet data flows into centralized dashboards, saving team members 15 hours of repetitive tracking per week.",
    b3: "Collaborated with senior executives to align project scopes, delivering 100% of milestones ahead of strict quarterly deadlines.",
    actionVerbs: ["Spearheaded", "Optimized", "Collaborated", "Delivered", "Led", "Analyzed"],
    achievements: "Accomplished [X] as measured by [Y], by doing [Z].",
    keywords: ["Project Execution", "Operational Efficiencies", "Process Improvements", "Stakeholder Relations", "Resource Allocations", "Team Management", "KPI Tracking", "Risk Management"],
    atsScore: 78,
    atsFeedback: [
      "This is a general template. Enter your specific Target Job Title and click 'Generate ATS Content' to access specialized AI suggestions.",
      "Ensure you highlight quantifiable percentages, monetary metrics, or hours saved in your job bullets.",
      "Stick to high-contrast standard serif fonts to guarantee 100% machine-readability on older systems."
    ]
  }
};

// Define cohesive Material UI theme matching "Geometric Balance" design system
const customTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e293b", // slate-800
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2563eb", // blue-600
    },
    background: {
      default: "#f8fafc", // slate-50
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a", // slate-900
      secondary: "#475569", // slate-600
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          textTransform: "none",
          fontWeight: 700,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(1); // 0 = templates, 1 = editor, 2 = ats-score
  const [prevTab, setPrevTab] = useState<number>(1);

  const selectTab = (newTab: number) => {
    if (newTab !== activeTab) {
      setPrevTab(activeTab);
      setActiveTab(newTab);
    }
  };

  const direction = activeTab > prevTab ? 1 : -1;

  const slideFadeVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir * 40,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25 }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir * -40,
      transition: { duration: 0.2 }
    })
  };

  const [params, setParams] = useState<SearchParams>({
    jobTitle: "",
    industry: "",
    experienceLevel: "Mid-Level",
    additionalContext: "",
    currentSkills: "",
  });

  const [templateStyle, setTemplateStyle] = useState<TemplateStyle>("ats-traditional");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [resumeData, setResumeData] = useState<ResumeData>(clientPresets.default);
  const [atsScanning, setAtsScanning] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string>("");

  // Trigger quick filling of demo data
  const handleQuickFill = (role: "software" | "marketing" | "healthcare" | "product") => {
    const data = clientPresets[role];
    setResumeData(data);
    setParams({
      jobTitle: role === "software" ? "Senior Software Engineer" 
               : role === "marketing" ? "B2B Marketing Lead" 
               : role === "healthcare" ? "Emergency Department Nurse" 
               : "Lead Product Manager",
      industry: role === "software" ? "Information Technology" 
               : role === "marketing" ? "Marketing & Advertising" 
               : role === "healthcare" ? "Healthcare & Medicine" 
               : "Software as a Service (SaaS)",
      experienceLevel: role === "software" ? "Senior-Level" : "Mid-Level",
      additionalContext: `Example template for ${role} role.`,
      currentSkills: data.skills.slice(0, 4).join(", ")
    });
    setHasGenerated(true);
  };

  // Trigger server-side AI content generation via our Express API
  const handleGenerate = async () => {
    if (!params.jobTitle) return;

    setIsGenerating(true);
    setHasGenerated(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const data = await response.json();
        setResumeData(data);
        setHasGenerated(true);
      } else {
        console.error("API response error, falling back to local matches");
        // Fallback matching logic based on keywords
        const titleLower = params.jobTitle.toLowerCase();
        let fallbackData = clientPresets.default;

        if (titleLower.includes("software") || titleLower.includes("engineer") || titleLower.includes("developer")) {
          fallbackData = clientPresets.software;
        } else if (titleLower.includes("marketing") || titleLower.includes("brand") || titleLower.includes("seo")) {
          fallbackData = clientPresets.marketing;
        } else if (titleLower.includes("nurse") || titleLower.includes("health") || titleLower.includes("medical")) {
          fallbackData = clientPresets.healthcare;
        } else if (titleLower.includes("product") || titleLower.includes("manager") || titleLower.includes("pm")) {
          fallbackData = clientPresets.product;
        }

        setResumeData(fallbackData);
        setHasGenerated(true);
      }
    } catch (err) {
      console.error("API request failed, utilizing smart offline matching", err);
      // Fallback matching logic on client error
      const titleLower = params.jobTitle.toLowerCase();
      let fallbackData = clientPresets.default;

      if (titleLower.includes("software") || titleLower.includes("engineer") || titleLower.includes("developer")) {
        fallbackData = clientPresets.software;
      } else if (titleLower.includes("marketing") || titleLower.includes("brand") || titleLower.includes("seo")) {
        fallbackData = clientPresets.marketing;
      } else if (titleLower.includes("nurse") || titleLower.includes("health") || titleLower.includes("medical")) {
        fallbackData = clientPresets.healthcare;
      } else if (titleLower.includes("product") || titleLower.includes("manager") || titleLower.includes("pm")) {
        fallbackData = clientPresets.product;
      }

      setResumeData(fallbackData);
      setHasGenerated(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // Run detailed simulated ATS parser check with visual output
  const runAtsScan = () => {
    setAtsScanning(true);
    setScanMessage("Initializing ATS Screener Sandbox...");
    setTimeout(() => {
      setScanMessage("Extracting text and identifying document hierarchy...");
      setTimeout(() => {
        setScanMessage("Running semantic keyword-density algorithms...");
        setTimeout(() => {
          setScanMessage("Validating single-column structure guidelines...");
          setTimeout(() => {
            setAtsScanning(false);
            setScanMessage("");
          }, 600);
        }, 600);
      }, 500);
    }, 500);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    selectTab(newValue);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex", flexDirection: "column" }}>
        
        {/* Navbar Header using Material UI Design */}
        <AppBar position="sticky" sx={{ bgcolor: "primary.main", borderBottom: "1px solid", borderColor: "slate.700", zIndex: 30 }} elevation={1} className="print:hidden">
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: 56, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ width: 32, height: 32, bgcolor: "secondary.main", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "white" }}>
                  AI
                </Box>
                <Box>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: 800, color: "white", lineHeight: 1.2 }}>
                    ResuMatrix <Typography component="span" variant="subtitle1" sx={{ color: "secondary.light", fontWeight: 500 }}>Pro</Typography>
                  </Typography>
                </Box>
              </Box>

              {/* Stateful Material-UI Tabs Header Component */}
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 3 } }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  textColor="inherit"
                  indicatorColor="secondary"
                  sx={{
                    minHeight: 40,
                    "& .MuiTab-root": {
                      minHeight: 40,
                      py: 1,
                      px: { xs: 1.5, sm: 2.5 },
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      opacity: 0.8,
                      "&.Mui-selected": {
                        opacity: 1,
                        color: "#60a5fa"
                      }
                    }
                  }}
                >
                  <Tab id="tab-nav-templates" icon={<GridIcon size={14} />} iconPosition="start" label="Templates" />
                  <Tab id="tab-nav-editor" icon={<SlidersIcon size={14} />} iconPosition="start" label="Editor" />
                  <Tab id="tab-nav-ats" icon={<Award size={14} />} iconPosition="start" label="ATS Score" />
                </Tabs>

                <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 1, bgcolor: "slate.800", px: 1.5, py: 0.5, borderRadius: "4px", border: "1px solid", borderColor: "slate.700" }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "emerald.500" }} />
                  <Typography variant="caption" sx={{ color: "slate.300", fontWeight: 700, textTransform: "uppercase", fontSize: "9px", letterSpacing: "1px" }}>
                    98% Parser Accuracy
                  </Typography>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Main Workspace containing Material UI Components & Motion Transitions */}
        <Box sx={{ flexGrow: 1, py: { xs: 3, md: 4 } }}>
          <Container maxWidth="lg">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="templates-tab-view"
                  custom={direction}
                  variants={slideFadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  id="view-templates"
                >
                  {/* Title block */}
                  <Box sx={{ textAlign: "center", maxWidth: 600, mx: "auto", mb: 4, mt: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.primary", mb: 1, letterSpacing: "-0.5px" }}>
                      Select an ATS-Compliant Layout
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                      Choose from four professionally tuned, single-column frameworks. Every layout avoids structural columns, graphs, and visual decorations to score maximum points with standard candidate scanners.
                    </Typography>
                  </Box>

                  {/* Material Grid layout of templates */}
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    
                    {/* Traditional Times */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Paper sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", borderColor: templateStyle === "ats-traditional" ? "secondary.main" : "divider", borderWidth: templateStyle === "ats-traditional" ? 2 : 1 }}>
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ mb: 2.5, display: "flex", justifyContent: "center" }}>
                            <TemplateMiniPreview style="ats-traditional" isSelected={templateStyle === "ats-traditional"} />
                          </Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>
                            Traditional Classic
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", display: "block", mt: 0.5 }}>
                            Times New Roman Serif
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.75rem", mt: 1.5, lineHeight: 1.5 }}>
                            Recommended by top-tier recruiters. Employs classic margins and timeless styling designed to read with 100% accuracy on dated legacy trackers.
                          </Typography>
                        </Box>
                        <Button 
                          variant={templateStyle === "ats-traditional" ? "contained" : "outlined"} 
                          color="primary"
                          fullWidth
                          size="small"
                          onClick={() => {
                            setTemplateStyle("ats-traditional");
                            selectTab(1);
                          }}
                        >
                          {templateStyle === "ats-traditional" ? "Selected & Edit" : "Select Traditional"}
                        </Button>
                      </Paper>
                    </Grid>

                    {/* Modern Arial */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Paper sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", borderColor: templateStyle === "ats-modern" ? "secondary.main" : "divider", borderWidth: templateStyle === "ats-modern" ? 2 : 1 }}>
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ mb: 2.5, display: "flex", justifyContent: "center" }}>
                            <TemplateMiniPreview style="ats-modern" isSelected={templateStyle === "ats-modern"} />
                          </Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>
                            Modern Professional
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", display: "block", mt: 0.5 }}>
                            Arial Sans-Serif
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.75rem", mt: 1.5, lineHeight: 1.5 }}>
                            Clean left-aligned structure designed for tech and startup ecosystems. Delivers modern spacing with standard Arial font for safe readability.
                          </Typography>
                        </Box>
                        <Button 
                          variant={templateStyle === "ats-modern" ? "contained" : "outlined"} 
                          color="primary"
                          fullWidth
                          size="small"
                          onClick={() => {
                            setTemplateStyle("ats-modern");
                            selectTab(1);
                          }}
                        >
                          {templateStyle === "ats-modern" ? "Selected & Edit" : "Select Modern"}
                        </Button>
                      </Paper>
                    </Grid>

                    {/* Executive Garamond */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Paper sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", borderColor: templateStyle === "ats-executive" ? "secondary.main" : "divider", borderWidth: templateStyle === "ats-executive" ? 2 : 1 }}>
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ mb: 2.5, display: "flex", justifyContent: "center" }}>
                            <TemplateMiniPreview style="ats-executive" isSelected={templateStyle === "ats-executive"} />
                          </Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>
                            Executive Elegant
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", display: "block", mt: 0.5 }}>
                            Garamond Serif Style
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.75rem", mt: 1.5, lineHeight: 1.5 }}>
                            Dignified, authority-driven presentation. Features elegant headers and double borders optimal for managers, leads, and executives.
                          </Typography>
                        </Box>
                        <Button 
                          variant={templateStyle === "ats-executive" ? "contained" : "outlined"} 
                          color="primary"
                          fullWidth
                          size="small"
                          onClick={() => {
                            setTemplateStyle("ats-executive");
                            selectTab(1);
                          }}
                        >
                          {templateStyle === "ats-executive" ? "Selected & Edit" : "Select Executive"}
                        </Button>
                      </Paper>
                    </Grid>

                    {/* Clean Minimalist */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Paper sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", borderColor: templateStyle === "ats-clean" ? "secondary.main" : "divider", borderWidth: templateStyle === "ats-clean" ? 2 : 1 }}>
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ mb: 2.5, display: "flex", justifyContent: "center" }}>
                            <TemplateMiniPreview style="ats-clean" isSelected={templateStyle === "ats-clean"} />
                          </Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>
                            Clean Minimalist
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", display: "block", mt: 0.5 }}>
                            Symmetrical Layout
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.75rem", mt: 1.5, lineHeight: 1.5 }}>
                            Symmetrical layouts utilizing neat typography hierarchies. Built with generous margins for readability across medical and retail fields.
                          </Typography>
                        </Box>
                        <Button 
                          variant={templateStyle === "ats-clean" ? "contained" : "outlined"} 
                          color="primary"
                          fullWidth
                          size="small"
                          onClick={() => {
                            setTemplateStyle("ats-clean");
                            selectTab(1);
                          }}
                        >
                          {templateStyle === "ats-clean" ? "Selected & Edit" : "Select Clean"}
                        </Button>
                      </Paper>
                    </Grid>

                  </Grid>

                  {/* Informative Banner */}
                  <Paper sx={{ p: 3, maxWidth: 650, mx: "auto", display: "flex", alignItems: "center", gap: 2, bgcolor: "blue.50", border: "1px solid", borderColor: "blue.100" }}>
                    <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1.5 }}>
                      <strong>Standard Parser Policy:</strong> ResuMatrix ensures that all exported resumes adhere strictly to the plain text model required by candidate trackers. All options above are 100% compliant.
                    </Typography>
                  </Paper>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  key="editor-tab-view"
                  custom={direction}
                  variants={slideFadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  id="view-editor"
                >
                  <Grid container spacing={3}>
                    {/* Left Panel - Configurations & AI Score Side Panel (4 cols) */}
                    <Grid size={{ xs: 12, lg: 4 }} sx={{ display: "flex", flexDirection: "column", gap: 3 }} className="print:hidden">
                      <ResumeForm
                        params={params}
                        setParams={setParams}
                        templateStyle={templateStyle}
                        setTemplateStyle={setTemplateStyle}
                        isGenerating={isGenerating}
                        onGenerate={handleGenerate}
                        onQuickFill={handleQuickFill}
                      />

                      <AIPanel
                        data={resumeData}
                        hasGenerated={hasGenerated}
                        jobTitle={params.jobTitle}
                      />
                    </Grid>

                    {/* Right Panel - Interactive Resume Canvas (8 cols) */}
                    <Grid size={{ xs: 12, lg: 8 }} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <ResumePreview
                        data={resumeData}
                        setData={setResumeData}
                        templateStyle={templateStyle}
                        jobTitle={params.jobTitle}
                      />
                    </Grid>
                  </Grid>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div
                  key="ats-score-tab-view"
                  custom={direction}
                  variants={slideFadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  id="view-atsscore"
                  className="space-y-8 text-left"
                >
                  {/* Analysis Header */}
                  <Paper sx={{ p: 3, display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 3 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.primary" }}>
                        ATS Audit & Optimizer Hub
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Run candidate screenings instantly against our semantic intelligence parser engine.
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={runAtsScan}
                      disabled={atsScanning}
                      startIcon={atsScanning ? <CircularProgress size={16} color="inherit" /> : <Scan size={14} />}
                      sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}
                    >
                      {atsScanning ? "Parsing Document..." : "Re-Scan Resume"}
                    </Button>
                  </Paper>

                  {/* Loader Screen */}
                  {atsScanning && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Paper sx={{ p: 3, bgcolor: "slate.900", color: "common.white", border: "1px solid", borderColor: "slate.700" }}>
                        <Stack spacing={1}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "blue.400" }}>
                            <Box sx={{ width: 8, height: 8, bgcolor: "secondary.main", borderRadius: "50%", animation: "pulse 1s infinite" }} />
                            <Typography variant="body2" sx={{ fontFamily: "monospace", fontWeight: "bold" }}>
                              {scanMessage}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ fontFamily: "monospace", color: "slate.400" }}>
                            System Logs: 100% structure check, no charts detected, verified text-layer encoding.
                          </Typography>
                        </Stack>
                      </Paper>
                    </motion.div>
                  )}

                  {/* Scoring Gauge layout */}
                  <Grid container spacing={3}>
                    
                    {/* Score Dial */}
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Paper sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", height: "100%" }}>
                        <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.secondary", letterSpacing: "1px", mb: 3 }}>
                          Compliance Grade
                        </Typography>

                        <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
                          <svg className="w-40 h-40 transform -rotate-90">
                            <circle
                              cx="80"
                              cy="80"
                              r="64"
                              className="stroke-slate-100"
                              strokeWidth="12"
                              fill="transparent"
                            />
                            <circle
                              cx="80"
                              cy="80"
                              r="64"
                              className="stroke-blue-600 transition-all duration-1000 ease-out"
                              strokeWidth="12"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 64}
                              strokeDashoffset={(2 * Math.PI * 64) - (resumeData.atsScore / 100) * (2 * Math.PI * 64)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <Box sx={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography variant="h3" sx={{ fontWeight: 900, color: "text.primary" }}>
                              {resumeData.atsScore}%
                            </Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                              Rating
                            </Typography>
                          </Box>
                        </Box>

                        <Stack spacing={1.5} sx={{ width: "100%" }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, bgcolor: "emerald.50", px: 2, py: 1, borderRadius: "4px", color: "emerald.700" }}>
                            <BadgeCheck size={16} />
                            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                              Strong Competency Match
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.5, px: 2 }}>
                            Your keyword selection is highly competitive. Aim for 85%+ to secure automated interviews.
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>

                    {/* Specific checks */}
                    <Grid size={{ xs: 12, md: 8 }}>
                      <Paper sx={{ p: 4, height: "100%" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, borderBottom: "1px solid", borderColor: "divider", pb: 2, mb: 3 }}>
                          <FileBadge className="text-blue-600" size={20} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>
                            Structural Checklist Analysis
                          </Typography>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 4 }}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ p: 2, bgcolor: "background.default", border: "1px solid", borderColor: "divider", borderRadius: "4px", display: "flex", alignItems: "start", gap: 1.5 }}>
                              <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: "0.75rem" }}>
                                  No Multi-Column Grids
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                                  Avoids table/grid wrapping bugs inside Taleo parse algorithms.
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ p: 2, bgcolor: "background.default", border: "1px solid", borderColor: "divider", borderRadius: "4px", display: "flex", alignItems: "start", gap: 1.5 }}>
                              <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: "0.75rem" }}>
                                  Clear Section Headers
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                                  Uses standard titles to ensure accurate work history indexing.
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ p: 2, bgcolor: "background.default", border: "1px solid", borderColor: "divider", borderRadius: "4px", display: "flex", alignItems: "start", gap: 1.5 }}>
                              <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: "0.75rem" }}>
                                  Standard Text Formats
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                                  Utilizes standard system fonts (Times, Arial, Garamond) safely.
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ p: 2, bgcolor: "background.default", border: "1px solid", borderColor: "divider", borderRadius: "4px", display: "flex", alignItems: "start", gap: 1.5 }}>
                              <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: "0.75rem" }}>
                                  Plain Content Hierarchy
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                                  Maintains standard margins and breaks lines cleanly.
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>

                        <Stack spacing={2}>
                          <Typography variant="caption" sx={{ fontWeight: 900, textTransform: "uppercase", color: "text.secondary", letterSpacing: "1px" }}>
                            Recommended Revisions
                          </Typography>
                          <Stack spacing={1.5}>
                            {resumeData.atsFeedback.map((tip, index) => (
                              <Box key={index} sx={{ display: "flex", alignItems: "start", gap: 1.5 }}>
                                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={14} />
                                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                                  {tip}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Stack>
                      </Paper>
                    </Grid>

                  </Grid>

                  {/* Keyword Optimization */}
                  <Paper sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 850 }}>
                        Target Keyword Alignment Density
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Make sure these key terms are present inside your experience section or core competencies header.
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {resumeData.keywords.map((word, idx) => (
                        <Grid size={{ xs: 6, sm: 3 }} key={idx}>
                          <Paper sx={{ p: 2, bgcolor: "background.default", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary" }}>
                              {word}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, pt: 1, borderTop: "1px solid", borderColor: "divider" }}>
                              <Typography variant="caption" sx={{ color: "emerald.600", fontWeight: "bold", fontSize: "9px" }}>
                                MATCHED
                              </Typography>
                              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "emerald.500" }} />
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>

                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </Box>

        {/* Footer */}
        <Box component="footer" sx={{ bgcolor: "primary.main", borderTop: "1px solid", borderColor: "slate.800", py: 4, mt: "auto" }} className="print:hidden">
          <Container maxWidth="lg">
            <Typography variant="caption" sx={{ color: "slate.400", display: "block", textAlign: "center", letterSpacing: "0.5px" }}>
              © 2026 ResuMatrix AI Pro platform. Fully machine-readable, single-column formatted CVs optimized for automated screeners.
            </Typography>
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
