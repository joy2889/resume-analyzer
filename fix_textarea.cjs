const fs = require('fs');
let code = fs.readFileSync('src/components/ResumePreview.tsx', 'utf-8');

if (!code.includes('import TextareaAutosize')) {
  code = code.replace(
    'import React from "react";',
    'import React from "react";\nimport TextareaAutosize from "react-textarea-autosize";'
  );
}

code = code.replace(/<textarea/g, '<TextareaAutosize');
code = code.replace(/<\/textarea>/g, '</TextareaAutosize>');
code = code.replace(/rows=\{\d+\}/g, '');

fs.writeFileSync('src/components/ResumePreview.tsx', code);
