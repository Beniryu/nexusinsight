import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const WOFF2 = [
  'ClashDisplay-Medium.woff2', 'ClashDisplay-Semibold.woff2',
  'Switzer-Regular.woff2', 'Switzer-Semibold.woff2',
  'JetBrainsMono-Regular.woff2', 'JetBrainsMono-Medium.woff2',
];

function lireSrcRecursif(dir: string): string {
  let out = '';
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out += lireSrcRecursif(p);
    else out += readFileSync(p, 'utf8');
  }
  return out;
}

describe('CAP-1 — fonts self-hostées', () => {
  it('EARS-1/EARS-2 : exactement les 6 woff2 attendus dans public/fonts', () => {
    const files = readdirSync('public/fonts').filter((f) => f.endsWith('.woff2'));
    expect(files.sort()).toEqual([...WOFF2].sort());
  });

  it('EARS-3 : 6 @font-face, chacune avec font-display: swap et une src locale', () => {
    const css = readFileSync('src/styles/fonts.css', 'utf8');
    const faces = css.split('@font-face').slice(1);
    expect(faces).toHaveLength(6);
    for (const face of faces) {
      expect(face).toMatch(/font-display:\s*swap/);
      expect(face).toMatch(/url\('\/fonts\/[A-Za-z-]+\.woff2'\)/);
    }
  });

  it('EARS-4 : aucun hôte externe de fonts ni CDN dans src/', () => {
    const src = lireSrcRecursif('src');
    expect(src).not.toMatch(/fonts\.googleapis\.com|api\.fontshare\.com|cdn\.jsdelivr|unpkg\.com/);
  });

  it('EARS-5 : LICENSES.md couvre ITF et OFL', () => {
    const lic = readFileSync('public/fonts/LICENSES.md', 'utf8');
    expect(lic).toMatch(/ITF FREE FONT LICENSE/i);
    expect(lic).toMatch(/SIL OPEN FONT LICENSE|OFL/i);
  });
});
