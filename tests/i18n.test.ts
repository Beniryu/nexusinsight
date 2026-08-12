import { describe, it, expect } from 'vitest';
import { site } from '../src/content/site';
import { routes } from '../src/content/routes';

/** Aplati les clés d'un objet en chemins pointés (meta.title, hero.ctaPrimary, …). */
function keyPaths(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
}

describe('parité i18n EN/FR', () => {
  it('les deux locales exposent exactement les mêmes clés', () => {
    expect(keyPaths(site.fr).sort()).toEqual(keyPaths(site.en).sort());
  });

  it('aucune valeur vide dans aucune locale', () => {
    for (const locale of ['en', 'fr'] as const) {
      for (const path of keyPaths(site[locale])) {
        const value = path.split('.').reduce<any>((o, k) => o[k], site[locale]);
        expect(String(value).trim(), `${locale}:${path}`).not.toBe('');
      }
    }
  });

  it('le FR n\'est pas une copie du EN (pair idiomatique, pas un placeholder)', () => {
    expect(site.fr.hero.title).not.toBe(site.en.hero.title);
    expect(site.fr.meta.description).not.toBe(site.en.meta.description);
  });
});

describe('parité des routes EN/FR', () => {
  it('EARS-48 : chaque page EN a sa paire FR et réciproquement, préfixes cohérents', () => {
    for (const r of routes) {
      expect(r.en.startsWith('/fr/')).toBe(false);
      expect(r.fr.startsWith('/fr/')).toBe(true);
    }
    expect(new Set(routes.map((r) => r.en)).size).toBe(routes.length);
    expect(new Set(routes.map((r) => r.fr)).size).toBe(routes.length);
  });
});
