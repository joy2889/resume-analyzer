const fs = require('fs');

let code = fs.readFileSync('src/components/ResumeForm.tsx', 'utf-8');
code = code.replace(/bg-white\/5\/10/g, 'bg-white/10');
code = code.replace(/btn-secondary w-full mt-8 bg-indigo-600 py-4 text-xl flex items-center justify-center gap-3 text-white/g, 'btn-primary w-full mt-8 py-4 text-xl flex items-center justify-center gap-3 text-white');
fs.writeFileSync('src/components/ResumeForm.tsx', code);
