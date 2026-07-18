const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

code = code.replace(
  '// @ts-ignore\nimport pdfParse from "pdf-parse";',
  'import * as pdfParseModule from "pdf-parse";\nconst pdfParse = (pdfParseModule as any).default || pdfParseModule;'
);

fs.writeFileSync('server.ts', code);
