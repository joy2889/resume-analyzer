const fs = require('fs');
let code = fs.readFileSync('src/components/AIPanel.tsx', 'utf-8');
code = code.replace(/bg-white\/5\/10\/30/g, 'bg-white/10');
code = code.replace(/bg-white\/5\/10/g, 'bg-white/10');
code = code.replace(/rotate-\[0\.5deg\]/g, '');
fs.writeFileSync('src/components/AIPanel.tsx', code);
