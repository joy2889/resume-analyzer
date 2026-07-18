import express from "express";
import multer from "multer";
import * as pdfParseModule from "pdf-parse";
const pdfParse = (pdfParseModule as any).default || pdfParseModule;
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

const globalFallbackResponse = {
  jobTitle: "Software Engineer",
  industry: "Technology",
  experienceLevel: "Mid-Level",
  currentSkills: "JavaScript, React, Node.js",
  additionalContext: "Imported from uploaded resume.",
  resumeData: {
    summary: "An experienced software engineer with a strong background in web development.",
    skills: ["JavaScript", "React", "Node.js"],
    b1: "Developed a new feature that increased user engagement by 20%.",
    b2: "Optimized database queries, reducing load times by 15%.",
    b3: "Collaborated with cross-functional teams to deliver projects on time.",
    actionVerbs: ["Developed", "Optimized", "Collaborated", "Engineered", "Designed", "Led"],
    achievements: "Accomplished X by doing Y.",
    keywords: ["Software", "Engineering", "Web"],
    atsScore: 85,
    atsFeedback: ["Good keyword usage.", "Clear formatting.", "Action-oriented bullets."]
  },
  personalInfo: {
    name: "Jane Doe",
    contact: "jane.doe@example.com",
    company1: "Tech Solutions",
    dates1: "2020 - Present",
    role1: "Software Engineer",
    location1: "Remote",
    company2: "Web Innovations",
    dates2: "2018 - 2020",
    role2: "Junior Developer",
    location2: "New York, NY",
    school: "State University",
    gradDate: "2018",
    degree: "B.S. Computer Science",
    gpa: "3.8"
  }
};


  // Middleware to parse JSON bodies
  app.use(express.json());

  // Initialize Gemini API client on the server
  // Always use process.env.GEMINI_API_KEY
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("GoogleGenAI client successfully initialized.");
    } catch (err) {
      console.error("Error initializing GoogleGenAI client:", err);
    }
  } else {
    console.warn("GEMINI_API_KEY is not configured or has default value. AI features will fallback to client/mock knowledge base.");
  }

  // API endpoint for resume suggestions and optimization
  app.post("/api/generate", async (req, res) => {
    const { jobTitle, industry, experienceLevel, additionalContext, currentSkills } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ error: "Job title is required." });
    }

    const titleLower = jobTitle.toLowerCase();
    const ind = industry || "General";
    const level = experienceLevel || "Mid-Level";
    const context = additionalContext || "No additional background provided.";
    const skillsList = currentSkills || "";

    // 1. Fallback Offline/Mock data if API key is not configured or model call fails
    const mockKnowledgeBase = {
      summary: `A highly motivated and results-driven ${level} ${jobTitle} in the ${ind} industry with a proven track record of designing, developing, and executing high-impact projects. Expert in collaborating across cross-functional teams to streamline workflows and deliver quality outcomes.`,
      skills: ["Core Competency A", "Core Competency B", "Strategic Planning", "Project Execution", "Cross-functional Leadership"],
      b1: `Led a critical team initiative in the ${ind} sector to deliver an optimized system, improving operational metrics by 25%.`,
      b2: `Orchestrated workflow re-engineering to reduce processing latency by 35%, boosting user retention rate.`,
      b3: `Partnered with senior stakeholders to design and implement strategic project milestones on budget and on schedule.`,
      actionVerbs: ["Orchestrated", "Designed", "Executed", "Pioneered", "Maximized", "Streamlined"],
      achievements: "XYZ Achievement Formula: 'Pioneered custom system [X], which increased throughput by 42% [Y], by designing parallel data queues [Z].'",
      keywords: [jobTitle, ind, "Optimization", "Integration", "Stakeholder Management", "Project Delivery"],
      atsScore: 78,
      atsFeedback: [
        "Include more quantifiable metrics (%, $, hours saved) in your experience bullet points.",
        `Incorporate specific tool names relevant to ${ind} to score higher in recruiter screenings.`,
        "Utilize a traditional single-column layout with standard serif fonts like Times New Roman."
      ]
    };

    if (!ai) {
      console.log("No AI client available. Sending mock knowledge-base suggestions.");
      return res.json(mockKnowledgeBase);
    }

    try {
      // Build a detailed system instruction and user prompt to retrieve highly structured, robust ATS-optimized results
      const systemInstruction = `You are an elite, world-class ATS (Applicant Tracking System) optimization advisor and expert resume writer. 
Your goal is to write parts of a resume that bypass parsing algorithms (such as Jobscan, Taleo, Workday) and appeal heavily to human recruiters.
Always write utilizing professional, impactful, action-oriented business prose.
For achievements, strictly adhere to the Google XYZ Formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. Ensure bullet points start with strong action verbs.
Do not use generic buzzwords or corporate jargon that lacks specific quantifiable metrics.`;

      const userPrompt = `Generate ATS-optimized resume content for the following profile:
- Job Title: ${jobTitle}
- Industry: ${ind}
- Experience Level: ${level}
- Additional Context: ${context}
- User's existing skills: ${skillsList}

Provide:
1. An elegant, compelling 'summary' text (2-3 sentences max).
2. An array of 'skills' (exactly 6-8 core technical competencies or specialized skills).
3. Three exceptional experience bullet points ('b1', 'b2', 'b3') following the XYZ formula, packed with highly realistic metrics.
4. An array of 6 key 'actionVerbs' tailored for this role.
5. A short string explaining 'achievements' guidelines / XYZ formula example customized for this job.
6. An array of 6-8 'keywords' that ATS scanners search for in this field.
7. An 'atsScore' (integer between 65 and 98) evaluating the alignment of these keywords.
8. An array of 3 'atsFeedback' tips outlining how the candidate can optimize their application further.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: {
                type: Type.STRING,
                description: "The professional summary paragraph for the resume, fully optimized."
              },
              skills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of exactly 6-8 top technical skills or core competencies."
              },
              b1: {
                type: Type.STRING,
                description: "First job bullet point following the Google XYZ formula."
              },
              b2: {
                type: Type.STRING,
                description: "Second job bullet point following the Google XYZ formula."
              },
              b3: {
                type: Type.STRING,
                description: "Third job bullet point following the Google XYZ formula."
              },
              actionVerbs: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of 6 high-impact action verbs relevant to this job title."
              },
              achievements: {
                type: Type.STRING,
                description: "Custom XYZ formula achievement framing guideline tailored to this role."
              },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of 6-8 important ATS keywords."
              },
              atsScore: {
                type: Type.INTEGER,
                description: "A scored alignment rating between 70 and 99."
              },
              atsFeedback: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Exactly 3 actionable feedback bullets to improve ATS compliance."
              }
            },
            required: ["summary", "skills", "b1", "b2", "b3", "actionVerbs", "achievements", "keywords", "atsScore", "atsFeedback"]
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsedData = JSON.parse(responseText.trim());
        return res.json(parsedData);
      } else {
        throw new Error("Received empty text response from Gemini API");
      }

    } catch (err) {
      console.error("Gemini API call failed, using mock knowledge base:", err);
      return res.json(mockKnowledgeBase);
    }
  });

  // API endpoint for parsing an existing resume text
  app.post("/api/parse-resume", async (req, res) => {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: "Resume text is required." });
    }

    
    if (!ai) {
      console.log("No AI client available. Sending fallback parse response.");
      return res.json(globalFallbackResponse);
    }

    try {
      const systemInstruction = `You are an expert resume parsing AI. Extract the candidate's target job title, industry, experience level, current skills, and professional summary/experience points from the provided resume text. Format the output to exactly match our application's expected JSON structure.`;
      
      const userPrompt = `Parse the following resume text and extract the details.
Resume Text:
${resumeText}

Output must include:
- jobTitle (string): Estimated target job title.
- industry (string): Estimated industry.
- experienceLevel (string): "Entry-Level", "Mid-Level", "Senior-Level", or "Executive-Level".
- currentSkills (string): Comma-separated list of top skills found.
- additionalContext (string): Any notable focus area found.
- resumeData (object): 
  - summary (string)
  - skills (array of 6-8 strings)
  - b1 (string)
  - b2 (string)
  - b3 (string)
  - actionVerbs (array of 6 strings)
  - achievements (string)
  - keywords (array of 6-8 strings)
  - atsScore (integer 65-98)
  - atsFeedback (array of 3 strings)
- personalInfo (object):
  - name (string)
  - contact (string)
  - company1 (string)
  - dates1 (string)
  - role1 (string)
  - location1 (string)
  - company2 (string)
  - dates2 (string)
  - role2 (string)
  - location2 (string)
  - school (string)
  - gradDate (string)
  - degree (string)
  - gpa (string)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              jobTitle: { type: Type.STRING },
              industry: { type: Type.STRING },
              experienceLevel: { type: Type.STRING },
              currentSkills: { type: Type.STRING },
              additionalContext: { type: Type.STRING },
              resumeData: {
                type: Type.OBJECT,
                properties: {
                  summary: { type: Type.STRING },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  b1: { type: Type.STRING },
                  b2: { type: Type.STRING },
                  b3: { type: Type.STRING },
                  actionVerbs: { type: Type.ARRAY, items: { type: Type.STRING } },
                  achievements: { type: Type.STRING },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  atsScore: { type: Type.INTEGER },
                  atsFeedback: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              },
              personalInfo: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  contact: { type: Type.STRING },
                  company1: { type: Type.STRING },
                  dates1: { type: Type.STRING },
                  role1: { type: Type.STRING },
                  location1: { type: Type.STRING },
                  company2: { type: Type.STRING },
                  dates2: { type: Type.STRING },
                  role2: { type: Type.STRING },
                  location2: { type: Type.STRING },
                  school: { type: Type.STRING },
                  gradDate: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  gpa: { type: Type.STRING }
                }
              }
            },
            required: ["jobTitle", "industry", "experienceLevel", "currentSkills", "additionalContext", "resumeData", "personalInfo"]
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        return res.json(JSON.parse(responseText.trim()));
      } else {
        throw new Error("Received empty text response from Gemini API");
      }
    } catch (err) {
      console.error("Gemini API resume parsing failed:", err);
      return res.json(globalFallbackResponse);
    }
  });

  
  const upload = multer({ storage: multer.memoryStorage() });

  app.post("/api/upload-resume", upload.single("resumeFile"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const globalFallbackResponse = {
        jobTitle: "Software Engineer",
        industry: "Technology",
        experienceLevel: "Mid-Level",
        currentSkills: "JavaScript, React, Node.js",
        additionalContext: "Imported from uploaded resume.",
        resumeData: {
          summary: "An experienced software engineer with a strong background in web development.",
          skills: ["JavaScript", "React", "Node.js"],
          b1: "Developed a new feature that increased user engagement by 20%.",
          b2: "Optimized database queries, reducing load times by 15%.",
          b3: "Collaborated with cross-functional teams to deliver projects on time.",
          actionVerbs: ["Developed", "Optimized", "Collaborated", "Engineered", "Designed", "Led"],
          achievements: "Accomplished X by doing Y.",
          keywords: ["Software", "Engineering", "Web"],
          atsScore: 85,
          atsFeedback: ["Good keyword usage.", "Clear formatting.", "Action-oriented bullets."]
        },
        personalInfo: {
          name: "Jane Doe",
          contact: "jane.doe@example.com",
          company1: "Tech Solutions",
          dates1: "2020 - Present",
          role1: "Software Engineer",
          location1: "Remote",
          company2: "Web Innovations",
          dates2: "2018 - 2020",
          role2: "Junior Developer",
          location2: "New York, NY",
          school: "State University",
          gradDate: "2018",
          degree: "B.S. Computer Science",
          gpa: "3.8"
        }
      };

    try {
      let resumeText = "";
      if (req.file.mimetype === "application/pdf") {
        const data = await pdfParse(req.file.buffer);
        resumeText = data.text;
      } else if (req.file.mimetype === "text/plain") {
        resumeText = req.file.buffer.toString("utf-8");
      } else {
        return res.status(400).json({ error: "Unsupported file type. Please upload a PDF or TXT file." });
      }

      // Reuse the logic from parse-resume endpoint by making an internal call or duplicating logic.
      // Easiest is to duplicate the logic for the Gemini call.
      
      const globalFallbackResponse = {
        jobTitle: "Software Engineer",
        industry: "Technology",
        experienceLevel: "Mid-Level",
        currentSkills: "JavaScript, React, Node.js",
        additionalContext: "Imported from uploaded resume.",
        resumeData: {
          summary: "An experienced software engineer with a strong background in web development.",
          skills: ["JavaScript", "React", "Node.js"],
          b1: "Developed a new feature that increased user engagement by 20%.",
          b2: "Optimized database queries, reducing load times by 15%.",
          b3: "Collaborated with cross-functional teams to deliver projects on time.",
          actionVerbs: ["Developed", "Optimized", "Collaborated", "Engineered", "Designed", "Led"],
          achievements: "Accomplished X by doing Y.",
          keywords: ["Software", "Engineering", "Web"],
          atsScore: 85,
          atsFeedback: ["Good keyword usage.", "Clear formatting.", "Action-oriented bullets."]
        },
        personalInfo: {
          name: "Jane Doe",
          contact: "jane.doe@example.com",
          company1: "Tech Solutions",
          dates1: "2020 - Present",
          role1: "Software Engineer",
          location1: "Remote",
          company2: "Web Innovations",
          dates2: "2018 - 2020",
          role2: "Junior Developer",
          location2: "New York, NY",
          school: "State University",
          gradDate: "2018",
          degree: "B.S. Computer Science",
          gpa: "3.8"
        }
      };

      if (!ai) {
        console.log("No AI client available. Sending fallback parse response.");
        return res.json(globalFallbackResponse);
      }

      const systemInstruction = `You are an expert resume parsing AI. Extract the candidate's target job title, industry, experience level, current skills, and professional summary/experience points from the provided resume text. Format the output to exactly match our application's expected JSON structure.`;
      
      const userPrompt = `Parse the following resume text and extract the details.Resume Text:${resumeText}Output must include:- jobTitle (string): Estimated target job title.- industry (string): Estimated industry.- experienceLevel (string): "Entry-Level", "Mid-Level", "Senior-Level", or "Executive-Level".- currentSkills (string): Comma-separated list of top skills found.- additionalContext (string): Any notable focus area found.- resumeData (object):   - summary (string)  - skills (array of 6-8 strings)  - b1 (string)  - b2 (string)  - b3 (string)  - actionVerbs (array of 6 strings)  - achievements (string)  - keywords (array of 6-8 strings)  - atsScore (integer 65-98)  - atsFeedback (array of 3 strings)- personalInfo (object):  - name (string)  - contact (string)  - company1 (string)  - dates1 (string)  - role1 (string)  - location1 (string)  - company2 (string)  - dates2 (string)  - role2 (string)  - location2 (string)  - school (string)  - gradDate (string)  - degree (string)  - gpa (string)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              jobTitle: { type: Type.STRING },
              industry: { type: Type.STRING },
              experienceLevel: { type: Type.STRING },
              currentSkills: { type: Type.STRING },
              additionalContext: { type: Type.STRING },
              resumeData: {
                type: Type.OBJECT,
                properties: {
                  summary: { type: Type.STRING },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  b1: { type: Type.STRING },
                  b2: { type: Type.STRING },
                  b3: { type: Type.STRING },
                  actionVerbs: { type: Type.ARRAY, items: { type: Type.STRING } },
                  achievements: { type: Type.STRING },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  atsScore: { type: Type.INTEGER },
                  atsFeedback: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              },
              personalInfo: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  contact: { type: Type.STRING },
                  company1: { type: Type.STRING },
                  dates1: { type: Type.STRING },
                  role1: { type: Type.STRING },
                  location1: { type: Type.STRING },
                  company2: { type: Type.STRING },
                  dates2: { type: Type.STRING },
                  role2: { type: Type.STRING },
                  location2: { type: Type.STRING },
                  school: { type: Type.STRING },
                  gradDate: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  gpa: { type: Type.STRING }
                }
              }
            },
            required: ["jobTitle", "industry", "experienceLevel", "currentSkills", "additionalContext", "resumeData", "personalInfo"]
          }
        }
      });
      const responseText = response.text;
      if (responseText) {
        return res.json(JSON.parse(responseText.trim()));
      } else {
        throw new Error("Received empty text response from Gemini API");
      }
    } catch (err) {
      console.error("Gemini API resume parsing failed:", err);
      return res.json(globalFallbackResponse); // fallback
    }
  });

  // Setup Vite Dev server or serve static assets in production
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode. Mounting Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Running in production mode. Serving static files from dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
