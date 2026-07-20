const fs = require('fs');
let code = fs.readFileSync('src/components/CustomCursor.tsx', 'utf-8');

code = code.replace(/border-indigo-400\/80/g, 'border-white');
code = code.replace(/shadow-\[0_0_15px_rgba\(129,140,248,0\.5\)\]/g, ''); // maybe remove shadow to keep it clean in difference mode
code = code.replace(/rgba\(99, 102, 241, 0\.15\)/g, 'rgba(255, 255, 255, 0.15)'); // hover background
code = code.replace(/bg-gradient-to-tr from-indigo-600\/30 via-purple-600\/20 to-pink-600\/30/g, 'bg-white/10'); // ambient glow in difference mode can just be white/10 which inverts to slight dark
code = code.replace(/shadow-\[0_0_10px_rgba\(255,255,255,0\.8\)\]/g, '');

fs.writeFileSync('src/components/CustomCursor.tsx', code);
