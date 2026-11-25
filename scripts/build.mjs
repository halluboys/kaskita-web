import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const release = JSON.parse(await readFile(`${root}release.json`, 'utf8'));
const substitutions = {
  version: release.version,
  filename: release.filename,
  downloadUrl: release.downloadUrl,
  sha256: release.sha256,
  minimumAndroid: release.minimumAndroid,
};
await rm(`${root}dist`, { recursive: true, force: true });
await mkdir(`${root}dist`);
await cp(`${root}public`, `${root}dist`, { recursive: true });
let html = await readFile(`${root}public/index.html`, 'utf8');
html = html.replace(/\{\{(\w+)\}\}/g, (_, key) => {
  if (!(key in substitutions)) throw new Error(`Unknown placeholder: ${key}`);
  return String(substitutions[key]).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
});
await writeFile(`${root}dist/index.html`, html);
await writeFile(`${root}dist/release.json`, `${JSON.stringify(release, null, 2)}\n`);
await writeFile(`${root}dist/.nojekyll`, '');
console.log(`Built KasKita ${release.version}; APK hosted on GitHub Releases.`);
