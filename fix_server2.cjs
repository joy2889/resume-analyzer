const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const globalFallback = `
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
`;

code = code.replace(
  'const PORT = 3000;',
  'const PORT = 3000;\n' + globalFallback
);

code = code.replace(/fallbackResponse/g, 'globalFallbackResponse');

fs.writeFileSync('server.ts', code);
