const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

code = code.replace(
  "try {\n      let resumeText",
  "const fallbackResponse = {\n        jobTitle: \"Software Engineer\",\n        industry: \"Technology\",\n        experienceLevel: \"Mid-Level\",\n        currentSkills: \"JavaScript, React, Node.js\",\n        additionalContext: \"Imported from uploaded resume.\",\n        resumeData: {\n          summary: \"An experienced software engineer with a strong background in web development.\",\n          skills: [\"JavaScript\", \"React\", \"Node.js\"],\n          b1: \"Developed a new feature that increased user engagement by 20%.\",\n          b2: \"Optimized database queries, reducing load times by 15%.\",\n          b3: \"Collaborated with cross-functional teams to deliver projects on time.\",\n          actionVerbs: [\"Developed\", \"Optimized\", \"Collaborated\", \"Engineered\", \"Designed\", \"Led\"],\n          achievements: \"Accomplished X by doing Y.\",\n          keywords: [\"Software\", \"Engineering\", \"Web\"],\n          atsScore: 85,\n          atsFeedback: [\"Good keyword usage.\", \"Clear formatting.\", \"Action-oriented bullets.\"]\n        },\n        personalInfo: {\n          name: \"Jane Doe\",\n          contact: \"jane.doe@example.com\",\n          company1: \"Tech Solutions\",\n          dates1: \"2020 - Present\",\n          role1: \"Software Engineer\",\n          location1: \"Remote\",\n          company2: \"Web Innovations\",\n          dates2: \"2018 - 2020\",\n          role2: \"Junior Developer\",\n          location2: \"New York, NY\",\n          school: \"State University\",\n          gradDate: \"2018\",\n          degree: \"B.S. Computer Science\",\n          gpa: \"3.8\"\n        }\n      };\n\n    try {\n      let resumeText"
);

// We need to remove the fallbackResponse declaration inside the try block
code = code.replace(
  /const fallbackResponse = \{\s*jobTitle: "Software Engineer",[\s\S]*?gpa: "3\.8"\n\s*\}\n\s*\};\n/,
  ""
);

code = code.replace('import pdfParse from "pdf-parse";', '// @ts-ignore\nimport pdfParse from "pdf-parse";');

fs.writeFileSync('server.ts', code);
