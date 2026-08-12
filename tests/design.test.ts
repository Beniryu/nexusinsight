import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function fichiersSous(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? fichiersSous(join(dir, e.name)) : [join(dir, e.name)],
  );
}

describe('CAP-12 — conformité design E3', () => {
  it('EARS-51 : aucune valeur hex hors tokens.css et fonts.css', () => {
    const fautifs = fichiersSous('src')
      .filter((f) => !f.endsWith('tokens.css') && !f.endsWith('fonts.css'))
      .filter((f) => /#[0-9a-fA-F]{3,8}\b/.test(readFileSync(f, 'utf8').replace(/#offers|#offres/g, '')));
    expect(fautifs).toEqual([]);
  });

  it('EARS-52 : toute transition/animation est neutralisée sous prefers-reduced-motion', () => {
    for (const f of fichiersSous('src')) {
      const contenu = readFileSync(f, 'utf8');
      if (/transition:|animation:/.test(contenu)) {
        expect(contenu, `${f} déclare une transition sans garde reduced-motion`).toMatch(
          /prefers-reduced-motion/,
        );
      }
    }
  });
});
