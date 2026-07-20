const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');
code = code.replace(/bg-white\/5\/10/g, 'bg-white/10');
code = code.replace(/btn-secondary w-full bg-indigo-600/g, 'btn-primary w-full');
code = code.replace(/bg-indigo-600 text-white/g, 'text-white');
fs.writeFileSync('src/App.tsx', code);
