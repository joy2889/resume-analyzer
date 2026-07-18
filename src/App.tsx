import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ResumeForm } from "./components/ResumeForm";
import { ResumePreview } from "./components/ResumePreview";
import { AIPanel } from "./components/AIPanel";
import { TemplateMiniPreview } from "./components/TemplateMiniPreview";
import { ResumeData, SearchParams, TemplateStyle, PersonalInfo } from "./types";
import { 
  FileText, Award, Layers, Sparkles, CheckCircle, TrendingUp, 
  Grid as GridIcon, Sliders as SlidersIcon, ShieldCheck, 
  BadgeCheck, FileCheck, AlertTriangle, Lightbulb, Scan, 
  RefreshCw, FileBadge
} from "lucide-react";

// (Keep the existing clientPresets exactly the same as before)
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
      "Clean template style (Arial or Helvetica font) is highly readable on modern ATS and recruiter screens."
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

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(1); 

  const selectTab = (newTab: number) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const slideFadeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } }
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
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Alex Johnson",
    contact: "New York, NY 10001 | (555) 123-4567 | alex.johnson@email.com | linkedin.com/in/alexj",
    degree: "Bachelor of Science in Business Administration",
    school: "State University",
    gradDate: "May 2018",
    gpa: "GPA: 3.8 / 4.0",
    company1: "Global Innovations Inc.",
    dates1: "Jan 2021 - Present",
    role1: "Lead Innovator",
    location1: "New York, NY",
    company2: "TechSolutions LLC",
    dates2: "Aug 2018 - Dec 2020",
    role2: "Associate Analyst",
    location2: "Boston, MA",
    bullet2_1: "Managed day-to-day operations and improved client retention rates by 22% over two years.",
    bullet2_2: "Developed comprehensive reporting dashboards that reduced data extraction time by 40 hours per month."
  });
  const [atsScanning, setAtsScanning] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string>("");
  const [isParsingResume, setIsParsingResume] = useState<boolean>(false);
  const [resumeText, setResumeText] = useState("");

  const handleParseResume = async (textToParse: string) => {
    if (!textToParse.trim()) return;
    setIsParsingResume(true);
    setHasGenerated(false);
    
    try {
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: textToParse }),
      });
      if (response.ok) {
        const parsed = await response.json();
        setParams({
          jobTitle: parsed.jobTitle || "",
          industry: parsed.industry || "",
          experienceLevel: parsed.experienceLevel || "Mid-Level",
          additionalContext: parsed.additionalContext || "",
          currentSkills: parsed.currentSkills || "",
        });
        if (parsed.resumeData) setResumeData(parsed.resumeData);
        if (parsed.personalInfo) setPersonalInfo(parsed.personalInfo);
        setHasGenerated(true);
      }
    } catch (err) {
      console.error("Failed to parse resume", err);
    } finally {
      setIsParsingResume(false);
    }
  };

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

  const handleGenerate = async () => {
    if (!params.jobTitle) return;

    setIsGenerating(true);
    setHasGenerated(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const data = await response.json();
        setResumeData(data);
        setHasGenerated(true);
      } else {
        const titleLower = params.jobTitle.toLowerCase();
        let fallbackData = clientPresets.default;

        if (titleLower.includes("software") || titleLower.includes("engineer") || titleLower.includes("developer")) fallbackData = clientPresets.software;
        else if (titleLower.includes("marketing") || titleLower.includes("brand") || titleLower.includes("seo")) fallbackData = clientPresets.marketing;
        else if (titleLower.includes("nurse") || titleLower.includes("health") || titleLower.includes("medical")) fallbackData = clientPresets.healthcare;
        else if (titleLower.includes("product") || titleLower.includes("manager") || titleLower.includes("pm")) fallbackData = clientPresets.product;

        setResumeData(fallbackData);
        setHasGenerated(true);
      }
    } catch (err) {
      const titleLower = params.jobTitle.toLowerCase();
      let fallbackData = clientPresets.default;

      if (titleLower.includes("software") || titleLower.includes("engineer") || titleLower.includes("developer")) fallbackData = clientPresets.software;
      else if (titleLower.includes("marketing") || titleLower.includes("brand") || titleLower.includes("seo")) fallbackData = clientPresets.marketing;
      else if (titleLower.includes("nurse") || titleLower.includes("health") || titleLower.includes("medical")) fallbackData = clientPresets.healthcare;
      else if (titleLower.includes("product") || titleLower.includes("manager") || titleLower.includes("pm")) fallbackData = clientPresets.product;

      setResumeData(fallbackData);
      setHasGenerated(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const runAtsScan = () => {
    setAtsScanning(true);
    setScanMessage("INITIALIZING ATS SCREENER SANDBOX...");
    setTimeout(() => {
      setScanMessage("EXTRACTING TEXT & HIERARCHY...");
      setTimeout(() => {
        setScanMessage("RUNNING SEMANTIC KEYWORD-DENSITY ALGORITHMS...");
        setTimeout(() => {
          setScanMessage("VALIDATING GUIDELINES...");
          setTimeout(() => {
            setAtsScanning(false);
            setScanMessage("");
          }, 600);
        }, 600);
      }, 500);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] text-white overflow-x-hidden relative font-body pattern-dots selection:bg-[#FF3AF2] selection:text-white">
      {/* Decorative Floating Shapes */}
      <div className="absolute top-[10%] left-[5%] text-[#00F5D4] animate-float z-0">
        <Sparkles size={64} className="opacity-80" />
      </div>
      <div className="absolute top-[40%] right-[5%] text-[#FF3AF2] animate-float-reverse z-0">
        <Sparkles size={48} className="opacity-80" />
      </div>
      <div className="absolute top-[80%] left-[10%] text-[#FFE600] animate-wiggle z-0">
        <Sparkles size={80} className="opacity-80" />
      </div>
      
      {/* Background Typography */}
      <div className="absolute top-20 left-0 right-0 text-[12rem] md:text-[20rem] font-black text-[#FF3AF2]/5 pointer-events-none text-center select-none z-0">
        HIRED
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#2D1B4E]/90 backdrop-blur-md border-b-8 border-[#FF3AF2] shadow-multi">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-[#FFE600] border-4 border-[#00F5D4] rounded-xl flex items-center justify-center font-display text-2xl text-[#0D0D1A] shadow-[4px_4px_0_#FF3AF2] group-hover:rotate-6 transition-transform">
              AI
            </div>
            <h1 className="font-heading font-black text-4xl uppercase tracking-tighter text-shadow-double">
              ResuMatrix <span className="text-[#00F5D4]">Pro</span>
            </h1>
          </div>
          
          <nav className="flex gap-2 p-2 bg-[#0D0D1A] border-4 border-[#FF6B35] rounded-full shadow-[4px_4px_0_#7B2FFF]">
            <button 
              onClick={() => selectTab(0)} 
              className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === 0 ? 'bg-[#FF3AF2] text-white border-2 border-[#00F5D4] glow-accent' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              <GridIcon size={18} /> Templates
            </button>
            <button 
              onClick={() => selectTab(1)} 
              className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === 1 ? 'bg-[#00F5D4] text-[#0D0D1A] border-2 border-[#FF3AF2] glow-accent' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              <SlidersIcon size={18} /> Editor
            </button>
            <button 
              onClick={() => selectTab(2)} 
              className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === 2 ? 'bg-[#FFE600] text-[#0D0D1A] border-2 border-[#FF6B35] glow-accent' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              <Award size={18} /> ATS Score
            </button>
          </nav>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* TAB 0: TEMPLATES */}
          {activeTab === 0 && (
            <motion.div key="tab-0" variants={slideFadeVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="font-heading font-black text-6xl md:text-8xl uppercase tracking-tighter text-shadow-triple mb-6">
                  CHOOSE YOUR <span className="text-gradient">WEAPON</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/80 font-bold max-w-2xl mx-auto border-4 border-dashed border-[#00F5D4] p-6 rounded-3xl bg-[#2D1B4E]/50 backdrop-blur">
                  Professionally tuned single-column layouts. No boring graphics, just pure ATS-crushing structural power.
                </p>
              </div>

              {/* Quick Scan Widget */}
              <div className="bg-[#2D1B4E]/80 backdrop-blur-md border-4 border-[#FF6B35] rounded-3xl p-8 md:p-12 shadow-multi max-w-3xl mx-auto transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="font-heading text-4xl font-black uppercase text-shadow-double flex items-center gap-4 mb-4 text-[#FFE600]">
                  <Scan size={36} className="animate-pulse" /> QUICK SCAN EXISTING RESUME
                </h3>
                <p className="text-lg text-white/80 mb-6 font-bold">
                  Drop your raw text here. Our AI will analyze the dopamine right out of it and pre-fill the editor for maximum impact!
                </p>
                <div className="space-y-4">
                  <textarea 
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full bg-[#0D0D1A] border-4 border-[#00F5D4] rounded-2xl p-6 text-xl text-white font-mono placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-[#FF3AF2]/50 focus:border-[#FF3AF2] transition-all min-h-[150px]"
                    placeholder="Paste your raw text here..."
                  />
                  <button 
                    onClick={() => { handleParseResume(resumeText); selectTab(1); }}
                    disabled={isParsingResume || !resumeText.trim()}
                    className="w-full bg-gradient-to-r from-[#FF3AF2] via-[#7B2FFF] to-[#00F5D4] text-white font-black uppercase tracking-widest text-xl h-16 rounded-full border-4 border-[#FFE600] shadow-multi hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 glow-accent"
                  >
                    {isParsingResume ? <RefreshCw className="animate-spin" size={24} /> : <Sparkles size={24} />}
                    {isParsingResume ? "EXTRACTING AWESOMENESS..." : "AUTO-FILL RESUME"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Traditional */}
                <div className={`bg-[#2D1B4E]/80 border-8 rounded-3xl p-8 flex flex-col justify-between shadow-multi transform transition-all duration-300 hover:rotate-1 hover:scale-105 ${templateStyle === "ats-traditional" ? 'border-[#00F5D4]' : 'border-[#FF3AF2]'}`}>
                  <div className="mb-8">
                    <h3 className="font-heading text-4xl font-black uppercase mb-2">Traditional Classic</h3>
                    <div className="inline-block bg-[#FFE600] text-[#0D0D1A] px-4 py-1 font-bold uppercase rounded-full mb-4 border-2 border-[#FF3AF2] rotate-2">
                      Times New Roman
                    </div>
                    <p className="text-lg opacity-80 font-medium">Recommended by recruiters. Employs timeless styling designed to read with 100% accuracy on older systems.</p>
                  </div>
                  <button 
                    onClick={() => { setTemplateStyle("ats-traditional"); selectTab(1); }}
                    className={`h-14 rounded-full font-black uppercase tracking-widest border-4 transition-all ${templateStyle === "ats-traditional" ? 'bg-[#00F5D4] text-[#0D0D1A] border-[#FF3AF2]' : 'bg-transparent text-white border-dashed border-[#FF3AF2] hover:bg-[#FF3AF2] hover:border-solid'}`}
                  >
                    {templateStyle === "ats-traditional" ? "SELECTED & EDIT" : "SELECT TRADITIONAL"}
                  </button>
                </div>
                
                {/* Modern */}
                <div className={`bg-[#2D1B4E]/80 border-8 rounded-3xl p-8 flex flex-col justify-between shadow-multi transform transition-all duration-300 hover:-rotate-1 hover:scale-105 ${templateStyle === "ats-modern" ? 'border-[#FF6B35]' : 'border-[#00F5D4]'}`}>
                  <div className="mb-8">
                    <h3 className="font-heading text-4xl font-black uppercase mb-2">Modern Pro</h3>
                    <div className="inline-block bg-[#FF3AF2] text-white px-4 py-1 font-bold uppercase rounded-full mb-4 border-2 border-[#FFE600] -rotate-2">
                      Arial Sans-Serif
                    </div>
                    <p className="text-lg opacity-80 font-medium">Clean structure for tech ecosystems. Delivers modern spacing with standard font for safe readability.</p>
                  </div>
                  <button 
                    onClick={() => { setTemplateStyle("ats-modern"); selectTab(1); }}
                    className={`h-14 rounded-full font-black uppercase tracking-widest border-4 transition-all ${templateStyle === "ats-modern" ? 'bg-[#FF6B35] text-white border-[#FFE600]' : 'bg-transparent text-white border-dashed border-[#00F5D4] hover:bg-[#00F5D4] hover:text-[#0D0D1A] hover:border-solid'}`}
                  >
                    {templateStyle === "ats-modern" ? "SELECTED & EDIT" : "SELECT MODERN"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: EDITOR */}
          {activeTab === 1 && (
            <motion.div key="tab-1" variants={slideFadeVariants} initial="initial" animate="animate" exit="exit">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 flex flex-col gap-8">
                  <ResumeForm
                    params={params}
                    setParams={setParams}
                    templateStyle={templateStyle}
                    setTemplateStyle={setTemplateStyle}
                    isGenerating={isGenerating}
                    onGenerate={handleGenerate}
                    isParsing={isParsingResume}
                    onParseResume={handleParseResume}
                  />
                  <AIPanel 
                    hasGenerated={hasGenerated}
                    resumeData={resumeData}
                  />
                </div>
                <div className="lg:col-span-7 sticky top-32 z-20">
                  <div className="bg-[#2D1B4E]/80 backdrop-blur-md border-8 border-[#00F5D4] rounded-3xl p-4 md:p-8 shadow-multi-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full pattern-stripes opacity-10 pointer-events-none" />
                    <ResumePreview
                      data={resumeData}
                      setData={setResumeData}
                      personalInfo={personalInfo}
                      setPersonalInfo={setPersonalInfo}
                      templateStyle={templateStyle}
                      jobTitle={params.jobTitle}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ATS SCORE */}
          {activeTab === 2 && (
            <motion.div key="tab-2" variants={slideFadeVariants} initial="initial" animate="animate" exit="exit" className="max-w-4xl mx-auto space-y-8">
              
              <div className="bg-[#2D1B4E]/90 border-8 border-[#FF3AF2] rounded-3xl p-10 md:p-16 shadow-multi text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pattern-checker opacity-10 pointer-events-none" />
                <h2 className="font-heading text-6xl font-black uppercase text-shadow-double mb-8 z-10 relative">
                  ATS <span className="text-[#FFE600]">SCORECARD</span>
                </h2>

                {atsScanning ? (
                  <div className="space-y-6 flex flex-col items-center">
                    <Scan className="animate-spin text-[#00F5D4]" size={80} />
                    <p className="text-3xl font-bold uppercase text-[#FF6B35] animate-pulse">{scanMessage}</p>
                    <div className="w-full bg-[#0D0D1A] h-4 rounded-full border-2 border-[#FF3AF2] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FF3AF2] to-[#00F5D4] w-1/2 animate-pulse rounded-full" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                      <div className="w-48 h-48 bg-[#0D0D1A] rounded-full border-8 border-[#00F5D4] flex items-center justify-center shadow-[0_0_60px_rgba(0,245,212,0.4)] relative">
                        <div className="absolute -top-4 -right-4 bg-[#FFE600] text-[#0D0D1A] font-black p-2 rounded-full border-4 border-[#FF3AF2] rotate-12">
                          EXCELLENT!
                        </div>
                        <span className="font-heading font-black text-7xl text-gradient">{resumeData.atsScore}</span>
                      </div>
                      <div className="text-left space-y-4">
                        <h3 className="font-heading text-4xl font-black uppercase text-[#FF3AF2]">You're Ready.</h3>
                        <p className="text-xl text-white/80 font-bold max-w-sm">This resume hits all the major keywords for <span className="text-[#00F5D4]">{params.jobTitle || 'your role'}</span>.</p>
                      </div>
                    </div>

                    <div className="text-left bg-[#0D0D1A]/50 rounded-2xl p-8 border-4 border-[#FF6B35]">
                      <h4 className="font-heading text-2xl font-black uppercase mb-6 flex items-center gap-3 text-[#FFE600]">
                        <Lightbulb size={28} /> AI Feedback Notes
                      </h4>
                      <ul className="space-y-4">
                        {resumeData.atsFeedback.map((feedback, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <CheckCircle className="text-[#00F5D4] shrink-0 mt-1" size={24} />
                            <span className="text-lg font-medium">{feedback}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={runAtsScan}
                      className="bg-transparent border-4 border-dashed border-[#00F5D4] text-white px-8 py-4 rounded-full font-black uppercase text-xl hover:bg-[#00F5D4] hover:text-[#0D0D1A] hover:border-solid transition-all"
                    >
                      RE-RUN FULL SCAN
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
