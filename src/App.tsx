import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ResumeForm } from "./components/ResumeForm";
import { ResumePreview } from "./components/ResumePreview";
import { AIPanel } from "./components/AIPanel";
import { TemplateStyle, ResumeData, SearchParams, PersonalInfo } from "./types";
import { Star, GripVertical, FileText, Award, Sliders as SlidersIcon, Grid as GridIcon, Scan, RefreshCw } from "lucide-react";

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
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "linear" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.1, ease: "linear" } }
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
    contact: "New York, NY 10001 | (555) 123-4567 | alex.johnson@email.com",
    degree: "B.S. in Computer Science",
    school: "State University",
    gradDate: "May 2018",
    gpa: "3.8 / 4.0",
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

        if (titleLower.includes("software") || titleLower.includes("engineer")) fallbackData = clientPresets.software;
        else if (titleLower.includes("marketing") || titleLower.includes("seo")) fallbackData = clientPresets.marketing;
        else if (titleLower.includes("nurse") || titleLower.includes("medical")) fallbackData = clientPresets.healthcare;
        else if (titleLower.includes("product") || titleLower.includes("pm")) fallbackData = clientPresets.product;

        setResumeData(fallbackData);
        setHasGenerated(true);
      }
    } catch (err) {
      setResumeData(clientPresets.default);
      setHasGenerated(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const runAtsScan = () => {
    setAtsScanning(true);
    setScanMessage("BOOTING SCANNER...");
    setTimeout(() => {
      setScanMessage("READING KEYWORDS...");
      setTimeout(() => {
        setScanMessage("ANALYZING FORMAT...");
        setTimeout(() => {
          setAtsScanning(false);
          setScanMessage("");
        }, 500);
      }, 500);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-neo-bg text-neo-fg font-body relative overflow-x-hidden pattern-halftone selection:bg-neo-secondary selection:text-black pb-20">
      
      {/* Decorative Neo-brutalist Elements */}
      <div className="absolute top-10 left-10 text-neo-accent animate-spin-slow z-0">
        <Star size={48} fill="currentColor" strokeWidth={3} className="drop-shadow-[4px_4px_0_#000]" />
      </div>
      <div className="absolute top-[30%] right-[10%] rotate-12 z-0">
        <div className="bg-neo-secondary border-4 border-black font-black uppercase text-xl px-4 py-2 shadow-neo-sm transform -rotate-6">
          100% RAW
        </div>
      </div>
      <div className="absolute bottom-[20%] left-[5%] text-neo-muted animate-spin-slow z-0" style={{ animationDirection: 'reverse' }}>
        <Star size={64} fill="currentColor" strokeWidth={3} className="drop-shadow-[6px_6px_0_#000]" />
      </div>

      <div className="absolute top-32 left-0 right-0 text-[10rem] md:text-[18rem] font-black text-black/5 pointer-events-none text-center select-none z-0 tracking-tighter leading-none -rotate-2">
        HIRED
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-neo-bg border-b-8 border-black shadow-neo-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-neo-secondary border-4 border-black flex items-center justify-center font-black text-2xl text-black shadow-neo-sm rotate-3 hover:-rotate-3 transition-transform">
              RMP
            </div>
            <h1 className="font-heading font-black text-3xl uppercase tracking-tighter text-stroke">
              ResuMatrix <span className="text-black" style={{ WebkitTextStroke: '0' }}>Pro</span>
            </h1>
          </div>
          
          <nav className="flex gap-2 p-1 bg-white border-4 border-black shadow-neo-sm">
            <button 
              onClick={() => selectTab(0)} 
              className={`px-4 py-2 font-bold uppercase tracking-wider transition-all duration-100 flex items-center gap-2 ${activeTab === 0 ? 'bg-neo-accent text-black border-4 border-black shadow-neo-sm -translate-y-1' : 'bg-transparent text-black border-4 border-transparent hover:bg-gray-100'}`}
            >
              <GridIcon size={18} strokeWidth={3} /> Templates
            </button>
            <button 
              onClick={() => selectTab(1)} 
              className={`px-4 py-2 font-bold uppercase tracking-wider transition-all duration-100 flex items-center gap-2 ${activeTab === 1 ? 'bg-neo-secondary text-black border-4 border-black shadow-neo-sm -translate-y-1' : 'bg-transparent text-black border-4 border-transparent hover:bg-gray-100'}`}
            >
              <SlidersIcon size={18} strokeWidth={3} /> Editor
            </button>
            <button 
              onClick={() => selectTab(2)} 
              className={`px-4 py-2 font-bold uppercase tracking-wider transition-all duration-100 flex items-center gap-2 ${activeTab === 2 ? 'bg-neo-muted text-black border-4 border-black shadow-neo-sm -translate-y-1' : 'bg-transparent text-black border-4 border-transparent hover:bg-gray-100'}`}
            >
              <Award size={18} strokeWidth={3} /> ATS
            </button>
          </nav>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* TAB 0: TEMPLATES */}
          {activeTab === 0 && (
            <motion.div key="tab-0" variants={slideFadeVariants} initial="initial" animate="animate" exit="exit" className="space-y-16">
              <div className="text-center max-w-4xl mx-auto relative">
                <div className="inline-block bg-neo-accent text-black font-black uppercase tracking-widest px-4 py-1 border-4 border-black shadow-neo-sm -rotate-2 mb-6">
                  Select Base
                </div>
                <h2 className="font-heading font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-8 text-stroke">
                  CHOOSE YOUR <span className="text-black" style={{ WebkitTextStroke: '0' }}>WEAPON</span>
                </h2>
              </div>

              {/* Quick Scan Widget */}
              <div className="card-neo p-8 md:p-12 max-w-3xl mx-auto -rotate-1 bg-neo-muted/30">
                <h3 className="font-heading text-4xl font-black uppercase mb-4 flex items-center gap-3">
                  <Scan size={36} strokeWidth={3} /> QUICK SCAN
                </h3>
                <p className="text-lg font-bold mb-6">
                  Paste raw text to auto-fill the editor. Stop wasting time typing.
                </p>
                <div className="space-y-4">
                  <textarea 
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full bg-white border-4 border-black p-4 text-lg font-bold placeholder:text-black/40 focus:bg-neo-secondary focus:shadow-neo-sm focus:outline-none transition-all min-h-[120px] resize-none"
                    placeholder="PASTE RAW RESUME TEXT HERE..."
                  />
                  <button 
                    onClick={() => { handleParseResume(resumeText); selectTab(1); }}
                    disabled={isParsingResume || !resumeText.trim()}
                    className="btn-neo w-full bg-neo-accent text-black h-16 text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-neo-md"
                  >
                    {isParsingResume ? <RefreshCw className="animate-spin" size={24} strokeWidth={3} /> : <Scan size={24} strokeWidth={3} />}
                    {isParsingResume ? "EXTRACTING..." : "AUTO-FILL"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Traditional */}
                <div className={`card-neo p-8 flex flex-col justify-between ${templateStyle === "ats-traditional" ? 'bg-neo-secondary -translate-y-2 shadow-neo-xl' : 'bg-white'}`}>
                  <div className="mb-8">
                    <h3 className="font-heading text-4xl font-black uppercase mb-4">Classic</h3>
                    <div className="inline-block bg-white text-black px-3 py-1 font-bold uppercase border-4 border-black shadow-neo-sm rotate-2 mb-4">
                      Times New Roman
                    </div>
                    <p className="text-lg font-bold">100% parser-safe. Boring look, maximum hire probability on ancient ATS systems.</p>
                  </div>
                  <button 
                    onClick={() => { setTemplateStyle("ats-traditional"); selectTab(1); }}
                    className={`btn-neo h-14 ${templateStyle === "ats-traditional" ? 'bg-white text-black' : 'bg-neo-secondary text-black'}`}
                  >
                    {templateStyle === "ats-traditional" ? "SELECTED (EDIT NOW)" : "SELECT CLASSIC"}
                  </button>
                </div>
                
                {/* Modern */}
                <div className={`card-neo p-8 flex flex-col justify-between ${templateStyle === "ats-modern" ? 'bg-neo-accent -translate-y-2 shadow-neo-xl' : 'bg-white'}`}>
                  <div className="mb-8">
                    <h3 className="font-heading text-4xl font-black uppercase mb-4">Modern</h3>
                    <div className="inline-block bg-white text-black px-3 py-1 font-bold uppercase border-4 border-black shadow-neo-sm -rotate-2 mb-4">
                      Arial
                    </div>
                    <p className="text-lg font-bold">Clean structure. Better spacing. Safe for modern tech ecosystems.</p>
                  </div>
                  <button 
                    onClick={() => { setTemplateStyle("ats-modern"); selectTab(1); }}
                    className={`btn-neo h-14 ${templateStyle === "ats-modern" ? 'bg-white text-black' : 'bg-neo-accent text-black'}`}
                  >
                    {templateStyle === "ats-modern" ? "SELECTED (EDIT NOW)" : "SELECT MODERN"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: EDITOR */}
          {activeTab === 1 && (
            <motion.div key="tab-1" variants={slideFadeVariants} initial="initial" animate="animate" exit="exit">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <div className="xl:col-span-5 flex flex-col gap-8">
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
                <div className="xl:col-span-7 sticky top-32 z-20">
                  <div className="card-neo p-4 md:p-8 bg-neo-muted/20 rotate-1">
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
              
              <div className="card-neo p-10 md:p-16 text-center bg-neo-secondary">
                <div className="inline-block bg-neo-accent border-4 border-black shadow-neo-sm px-4 py-1 font-black uppercase tracking-widest rotate-3 mb-6">
                  Analysis Complete
                </div>
                <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">
                  SCORECARD
                </h2>

                {atsScanning ? (
                  <div className="space-y-6 flex flex-col items-center py-12">
                    <Scan className="animate-spin text-black" size={80} strokeWidth={3} />
                    <p className="text-3xl font-black uppercase">{scanMessage}</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                      <div className="w-48 h-48 bg-white border-8 border-black rounded-full shadow-neo-md flex items-center justify-center relative">
                        <div className="absolute -top-4 -right-4 bg-neo-accent text-white font-black p-2 border-4 border-black rotate-12 shadow-neo-sm uppercase">
                          {resumeData.atsScore > 85 ? "LFG!" : "NEEDS WORK"}
                        </div>
                        <span className="font-heading font-black text-7xl">{resumeData.atsScore}</span>
                      </div>
                      <div className="text-left space-y-2 max-w-sm">
                        <h3 className="font-heading text-4xl font-black uppercase">Status:</h3>
                        <p className="text-2xl font-bold">
                          {resumeData.atsScore > 85 ? "You're ready to apply." : "Optimize keywords before sending."}
                        </p>
                      </div>
                    </div>

                    <div className="text-left bg-white border-4 border-black p-8 shadow-neo-sm rotate-1">
                      <h4 className="font-heading text-2xl font-black uppercase mb-6 flex items-center gap-3">
                        <Star size={28} strokeWidth={3} fill="currentColor" className="text-neo-secondary" /> AI Feedback
                      </h4>
                      <ul className="space-y-4 font-bold text-lg">
                        {resumeData.atsFeedback.map((feedback, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <div className="w-3 h-3 bg-neo-accent border-2 border-black mt-2 shrink-0 rounded-full" />
                            <span>{feedback}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={runAtsScan}
                      className="btn-neo bg-neo-muted text-black px-8 py-4 text-xl"
                    >
                      RE-RUN SCAN
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
