import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';

const release = JSON.parse(await readFile(new URL('../release.json', import.meta.url)));
const apk = process.argv[2];
if (!apk) throw new Error('Usage: npm run verify-apk -- /path/to/original-release.apk');
if ((await stat(apk)).size !== release.bytes) throw new Error('APK size does not match release');
const hash = createHash('sha256');
for await (const chunk of createReadStream(apk)) hash.update(chunk);
if (hash.digest('hex') !== release.sha256) throw new Error('APK SHA-256 does not match release');
console.log(`Verified original signed KasKita ${release.version} APK.`);
