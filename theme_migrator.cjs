const fs = require('fs');

const filesToMigrate = [
  'src/App.tsx',
  'src/components/ResumeForm.tsx',
  'src/components/ResumePreview.tsx',
  'src/components/AIPanel.tsx'
];

filesToMigrate.forEach(file => {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf-8');

  // Replace utility classes
  code = code.replace(/btn-neo/g, 'btn-secondary');
  code = code.replace(/card-neo/g, 'glass-panel');
  
  // Specific buttons
  code = code.replace(/btn-secondary w-full mt-8 bg-neo-accent text-black/g, 'btn-primary w-full mt-8');
  code = code.replace(/btn-secondary px-8 py-3 bg-neo-accent/g, 'btn-primary px-8 py-3');
  code = code.replace(/btn-secondary bg-neo-accent/g, 'btn-primary');
  
  // Borders & Shadows
  code = code.replace(/border-4 border-black/g, 'border border-white/10');
  code = code.replace(/border-8 border-black/g, 'border border-white/10');
  code = code.replace(/border-b-4 border-black/g, 'border-b border-white/10');
  code = code.replace(/border-b-2 border-black/g, 'border-b border-white/10');
  code = code.replace(/shadow-neo-sm/g, 'shadow-lg');
  code = code.replace(/shadow-neo-md/g, 'shadow-xl');
  code = code.replace(/shadow-neo-lg/g, 'shadow-2xl');
  code = code.replace(/shadow-neo-xl/g, 'shadow-2xl');

  // Colors
  code = code.replace(/bg-neo-bg/g, '');
  code = code.replace(/bg-neo-fg\/80/g, 'bg-black/80');
  code = code.replace(/bg-neo-secondary\/20/g, 'bg-white/5');
  code = code.replace(/bg-neo-secondary/g, 'bg-white/10');
  code = code.replace(/bg-neo-accent/g, 'bg-indigo-600');
  code = code.replace(/text-neo-accent/g, 'text-indigo-400');
  code = code.replace(/text-neo-secondary/g, 'text-purple-400');
  code = code.replace(/bg-neo-muted\/20/g, 'bg-white/5');
  code = code.replace(/bg-neo-muted/g, 'bg-white/10');

  // Typography
  code = code.replace(/font-heading/g, 'font-display');
  code = code.replace(/font-black/g, 'font-bold');

  // Input styling
  code = code.replace(/w-full bg-white border-4 border-black p-4 font-bold placeholder:text-black\/40 focus:bg-neo-secondary focus:shadow-neo-sm focus:outline-none transition-colors/g, 'input-lumina');
  code = code.replace(/w-full bg-white border-4 border-black p-4 font-bold placeholder:text-black\/40 focus:bg-neo-muted focus:shadow-neo-sm focus:outline-none transition-colors resize-none/g, 'input-lumina resize-none');
  code = code.replace(/w-full bg-white border-4 border-black p-4 font-bold focus:bg-neo-accent focus:shadow-neo-sm focus:outline-none transition-colors appearance-none rounded-none/g, 'input-lumina appearance-none');
  
  // Specific black/white replacements that aren't inside the print container
  // We have to be careful with ResumePreview.tsx since it needs black text and white bg.
  if (file !== 'src/components/ResumePreview.tsx') {
    code = code.replace(/bg-white text-black/g, 'bg-white/10 text-white');
    code = code.replace(/text-black/g, 'text-white');
    code = code.replace(/bg-white/g, 'bg-white/5');
  }

  // Rotations - remove them
  code = code.replace(/-rotate-1/g, '');
  code = code.replace(/rotate-1/g, '');
  code = code.replace(/-rotate-2/g, '');
  code = code.replace(/rotate-2/g, '');
  code = code.replace(/-rotate-3/g, '');
  code = code.replace(/rotate-3/g, '');
  code = code.replace(/rotate-12/g, '');

  fs.writeFileSync(file, code);
});
