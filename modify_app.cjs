const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const parseMethodRegex = /const handleParseResume = async \(textToParse: string\) => \{[\s\S]*?\};\n/g;

const newParseMethod = `const handleParseResume = async (file: File) => {
    setIsParsingResume(true);
    setHasGenerated(false);
    
    try {
      const formData = new FormData();
      formData.append("resumeFile", file);

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
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
      } else {
        console.error("Upload failed.");
      }
    } catch (err) {
      console.error("Failed to parse resume", err);
    } finally {
      setIsParsingResume(false);
    }
  };\n`;

code = code.replace(parseMethodRegex, newParseMethod);
fs.writeFileSync('src/App.tsx', code);
