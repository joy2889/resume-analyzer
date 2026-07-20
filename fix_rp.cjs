const fs = require('fs');

let code = fs.readFileSync('src/components/ResumePreview.tsx', 'utf-8');
code = code.replace(/focus:bg-white\/10\/30/g, 'focus:bg-gray-100');
code = code.replace(/focus:bg-white\/10/g, 'focus:bg-gray-100');
fs.writeFileSync('src/components/ResumePreview.tsx', code);
