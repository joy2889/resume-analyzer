const fs = require('fs');
let code = fs.readFileSync('src/components/ResumePreview.tsx', 'utf-8');

code = code.replace(
  'import React, { useState } from "react";',
  'import React, { useState } from "react";\nimport TextareaAutosize from "react-textarea-autosize";'
);

fs.writeFileSync('src/components/ResumePreview.tsx', code);
