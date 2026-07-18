const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

// Insert imports
if (!code.includes('import multer')) {
  code = code.replace(
    'import express from "express";',
    'import express from "express";\nimport multer from "multer";\nimport pdfParse from "pdf-parse";'
  );
}

// Find the start of Vite setup to insert our new endpoint before it
const viteSetupIndex = code.indexOf('// Setup Vite Dev server or serve static assets in production');

if (viteSetupIndex !== -1 && !code.includes('/api/upload-resume')) {
  const uploadRouteCode = `
  const upload = multer({ storage: multer.memoryStorage() });

  app.post("/api/upload-resume", upload.single("resumeFile"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

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
      
      const fallbackResponse = {
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
        return res.json(fallbackResponse);
      }

      const systemInstruction = \`You are an expert resume parsing AI. Extract the candidate's target job title, industry, experience level, current skills, and professional summary/experience points from the provided resume text. Format the output to exactly match our application's expected JSON structure.\`;
      
      const userPrompt = \`Parse the following resume text and extract the details.Resume Text:\${resumeText}Output must include:- jobTitle (string): Estimated target job title.- industry (string): Estimated industry.- experienceLevel (string): "Entry-Level", "Mid-Level", "Senior-Level", or "Executive-Level".- currentSkills (string): Comma-separated list of top skills found.- additionalContext (string): Any notable focus area found.- resumeData (object):   - summary (string)  - skills (array of 6-8 strings)  - b1 (string)  - b2 (string)  - b3 (string)  - actionVerbs (array of 6 strings)  - achievements (string)  - keywords (array of 6-8 strings)  - atsScore (integer 65-98)  - atsFeedback (array of 3 strings)- personalInfo (object):  - name (string)  - contact (string)  - company1 (string)  - dates1 (string)  - role1 (string)  - location1 (string)  - company2 (string)  - dates2 (string)  - role2 (string)  - location2 (string)  - school (string)  - gradDate (string)  - degree (string)  - gpa (string)\`;

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
      return res.json(fallbackResponse); // fallback
    }
  });

  `;
  
  code = code.slice(0, viteSetupIndex) + uploadRouteCode + code.slice(viteSetupIndex);
}

fs.writeFileSync('server.ts', code);
