import fs from 'fs';
import path from 'path';

const imagesDir = path.resolve('src/assets/images');
const outputFile = path.resolve('src/assets/embeddedImages.ts');

const images = [
  { key: 'HERO_FAMILY_PROTECTION', file: 'hero_family_protection_1794067424411.jpg' },
  { key: 'CHILD_EDUCATION_FUTURE', file: 'child_education_future_1794067426825.jpg' },
  { key: 'WORKING_ADULT_HOME', file: 'working_adult_home_1794071107053.jpg' },
  { key: 'RETIREMENT_SECURITY', file: 'retirement_security_1794067425221.jpg' },
  { key: 'FAMILY_SECURITY_ILLUSTRATION', file: 'family_security_illustration_1794069901082.jpg' },
  { key: 'GANGAVATHI_LANDSCAPE', file: 'gangavathi_landscape_1794067425322.jpg' },
];

let fileContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Embedded high-resolution Base64 assets to ensure 100% self-contained offline standalone execution.
 * Every hero slide, view, and banner has an embedded data URL.
 */

`;

for (const img of images) {
  const filePath = path.join(imagesDir, img.file);
  if (fs.existsSync(filePath)) {
    const buffer = fs.readFileSync(filePath);
    const base64 = buffer.toString('base64');
    fileContent += `export const ${img.key} = 'data:image/jpeg;base64,${base64}';\n\n`;
    console.log(`Embedded ${img.file} (${(buffer.length / 1024).toFixed(1)} KB) -> Base64`);
  } else {
    console.error(`Missing image: ${filePath}`);
  }
}

// Also embed SVG icon if exists
const iconPath = path.resolve('public/icon.svg');
if (fs.existsSync(iconPath)) {
  const iconSvg = fs.readFileSync(iconPath, 'utf-8');
  const iconBase64 = Buffer.from(iconSvg).toString('base64');
  fileContent += `export const ICON_SVG_DATA = 'data:image/svg+xml;base64,${iconBase64}';\n`;
}

fs.writeFileSync(outputFile, fileContent, 'utf-8');
console.log(`Successfully generated ${outputFile} (${(fileContent.length / 1024 / 1024).toFixed(2)} MB)`);
