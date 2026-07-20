const fs = require('fs');

let code = fs.readFileSync('src/components/ResumePreview.tsx', 'utf-8');

// Insert import
if (!code.includes('useReactToPrint')) {
  code = code.replace(
    'import React, { useState } from "react";',
    'import React, { useState, useRef } from "react";\nimport { useReactToPrint } from "react-to-print";'
  );
}

// Add ref and useReactToPrint hook inside component
const hookCode = `
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  
  const printDocument = () => {
    if (reactToPrintFn) {
      reactToPrintFn();
    } else {
      window.print();
    }
  };
`;

code = code.replace(
  /const printDocument = \(\) => \{\n\s*window\.print\(\);\n\s*\};/,
  hookCode
);

// Add ref to the print container
code = code.replace(
  /className="bg-white text-black p-8 md:p-12 border border-white\/10 shadow-2xl mx-auto w-full max-w-4xl resume-print-container"/g,
  'ref={contentRef} className="bg-white text-black p-8 md:p-12 border border-white/10 shadow-2xl mx-auto w-full max-w-4xl resume-print-container"'
);

fs.writeFileSync('src/components/ResumePreview.tsx', code);
