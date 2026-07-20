const fs = require('fs');

let code = fs.readFileSync('src/components/CustomCursor.tsx', 'utf-8');

// Change ambient glow from solid to gradient
code = code.replace(
  'bg-indigo-600/15 blur-[80px]',
  'bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-600/30 blur-[80px]'
);

// Change outer ring to have a bit of gradient or glow
code = code.replace(
  'border border-indigo-400/60',
  'border-2 border-indigo-400/80 shadow-[0_0_15px_rgba(129,140,248,0.5)]'
);

// Change inner dot color
code = code.replace(
  'bg-indigo-300',
  'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
);

// Increase outer ring size slightly for emphasis?
// Currently w-10 h-10 (40px)
code = code.replace(
  'w-10 h-10',
  'w-12 h-12'
);
code = code.replace(
  'x: mousePosition.x - 20,',
  'x: mousePosition.x - 24,'
);
code = code.replace(
  'y: mousePosition.y - 20,',
  'y: mousePosition.y - 24,'
);


fs.writeFileSync('src/components/CustomCursor.tsx', code);
