// ============================================================
// SevaPath — Quality Gate: Data & Scheme Verification Script
// ============================================================

import fs from 'node:fs';
import path from 'node:path';

let errors = [];
let warnings = [];

// 1. Verify benefits.ts
const benefitsPath = path.resolve('src/data/benefits.ts');
if (!fs.existsSync(benefitsPath)) {
  errors.push("Missing src/data/benefits.ts");
} else {
  const content = fs.readFileSync(benefitsPath, 'utf8');
  if (content.includes("href=\"#demo\"") || content.includes("'#demo'")) {
    // Only flag if used as active links
    const matches = content.match(/officialApplicationUrl:\s*['"]#demo['"]/g);
    if (matches) {
      errors.push(`Found ${matches.length} active #demo links in benefits.ts`);
    }
  }
}

// 2. Verify resources.ts
const resourcesPath = path.resolve('src/data/resources.ts');
if (!fs.existsSync(resourcesPath)) {
  errors.push("Missing src/data/resources.ts");
}

// 3. Verify translations.ts
const translationsPath = path.resolve('src/i18n/translations.ts');
if (!fs.existsSync(translationsPath)) {
  errors.push("Missing src/i18n/translations.ts");
} else {
  const content = fs.readFileSync(translationsPath, 'utf8');
  if (!content.includes('en: {')) errors.push("Missing English translations");
  if (!content.includes('te: {')) errors.push("Missing Telugu translations");
  if (!content.includes('hi: {')) errors.push("Missing Hindi translations");
}

// 4. Verify VERIFY.md, PROGRESS.md, NOTES.md
['VERIFY.md', 'PROGRESS.md', 'NOTES.md'].forEach(file => {
  if (!fs.existsSync(path.resolve(file))) {
    errors.push(`Missing documentation register: ${file}`);
  }
});

console.log("=== SevaPath Data Validation Check ===");
if (errors.length > 0) {
  console.error("FAIL: Quality check found errors:");
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log("PASS: All quality gate checks passed successfully.");
  if (warnings.length > 0) {
    warnings.forEach(w => console.warn(`  [Warning] ${w}`));
  }
  process.exit(0);
}
