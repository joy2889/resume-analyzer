const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf-8');

if (!code.includes('cursor: none')) {
  code = code.replace(
    'body {\n  @apply bg-[#030712]',
    'body {\n  cursor: none;\n  @apply bg-[#030712]'
  );
  
  code = code += '\n\n/* Hide default cursor globally for Lumina feel */\n* {\n  cursor: none !important;\n}\n';
  fs.writeFileSync('src/index.css', code);
}
