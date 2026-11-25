import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
execFileSync(process.execPath, ['scripts/build.mjs'], { cwd: root });
const html = await readFile(`${root}dist/index.html`, 'utf8');
const release = JSON.parse(await readFile(`${root}release.json`));

test('project-path and custom-domain builds resolve every local asset and anchor', async () => {
  for (const base of ['https://halluboys.github.io/kaskita-web/', 'https://kaskita.haluboy.org/']) {
    for (const [, value] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      if (value.startsWith('https:')) continue;
      if (value.startsWith('#')) {
        if (value.length > 1) assert.ok(html.includes(`id="${value.slice(1)}"`), `missing ${value}`);
        continue;
      }
      const resolved = new URL(value, base);
      assert.ok(resolved.href.startsWith(base), `${value} escapes project path`);
      await access(`${root}dist/${decodeURIComponent(resolved.href.slice(base.length))}`);
    }
  }
  const css = await readFile(`${root}dist/style.css`, 'utf8');
  for (const [, path] of css.matchAll(/url\('([^']+)'\)/g)) await access(`${root}dist/${path}`);
  const js = await readFile(`${root}dist/app.js`, 'utf8');
  assert.ok(js.includes("fetch('./release.json')"));
  assert.ok(js.includes('`./images/${file}.webp`'));
  for (const name of ['rekap', 'saldo-dana', 'saldo-persen', 'riwayat', 'laporan-pdf']) await access(`${root}dist/images/${name}.webp`);
});

test('both CTAs use the public release and match the version, Android requirement and SHA-256', () => {
  assert.equal(html.split(`href="${release.downloadUrl}"`).length - 1, 2);
  assert.ok(html.includes(release.version));
  assert.ok(html.includes(`Android ${release.minimumAndroid}`));
  assert.ok(html.includes(release.sha256));
  assert.ok(!html.includes('{{'));
  assert.ok(!html.includes('href="/download/'));
});

test('404 can return to the Pages homepage before custom-domain DNS is configured', async () => {
  const page = await readFile(`${root}dist/404.html`, 'utf8');
  assert.ok(page.includes('href="https://halluboys.github.io/kaskita-web/"'));
});
