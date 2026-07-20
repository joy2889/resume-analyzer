const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

if (!code.includes('CustomCursor')) {
  code = code.replace(
    'import { AIPanel } from "./components/AIPanel";',
    'import { AIPanel } from "./components/AIPanel";\nimport { CustomCursor } from "./components/CustomCursor";'
  );
  
  code = code.replace(
    'return (\n    <div className="min-h-screen',
    'return (\n    <div className="min-h-screen'
  );
  
  code = code.replace(
    '<div className="min-h-screen  text-neo-fg font-body relative overflow-x-hidden pattern-halftone selection:bg-white/10 selection:text-white pb-20">',
    '<div className="min-h-screen  text-neo-fg font-body relative overflow-x-hidden pattern-halftone selection:bg-white/10 selection:text-white pb-20">\n      <CustomCursor />'
  );
  fs.writeFileSync('src/App.tsx', code);
}
