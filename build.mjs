import { mkdir, copyFile, rm } from 'node:fs/promises';

const files = [
  'index.html',
  'app.js',
  'styles.css',
  'legends-logo.png',
  'manifest.webmanifest'
];

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of files) {
  await copyFile(file, `dist/${file}`);
}
console.log('Built static site into dist/');
