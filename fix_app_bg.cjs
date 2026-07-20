const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  'className="min-h-screen  text-neo-fg font-body relative overflow-x-hidden pattern-halftone selection:bg-white/10 selection:text-white pb-20"',
  'className="min-h-screen relative overflow-x-hidden pb-20"'
);

fs.writeFileSync('src/App.tsx', code);
