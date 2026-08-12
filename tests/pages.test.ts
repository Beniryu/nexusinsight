import { describe, it, expect, beforeAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { routes } from '../src/content/routes';

const SITE = 'https://nexusinsight.io';

/** dist/<chemin>/index.html pour une route en format directory ('/fr/' → dist/fr/index.html). */
function distHtml(path: string): string {
  return join('dist', ...path.split('/').filter(Boolean), 'index.html');
}

/**
 * Pages du registre déjà buildées : les tâches 05-07 créent les routes restantes,
 * ce harnais les couvrira mécaniquement dès qu'elles existeront dans dist/.
 */
function pagesBuildees() {
  return routes
    .flatMap((r) => [
      { r, path: r.en },
      { r, path: r.fr },
    ])
    .filter(({ path }) => existsSync(distHtml(path)));
}

beforeAll(() => {
  execFileSync('npx', ['astro', 'build'], { stdio: 'pipe' });
}, 180_000);

describe('CAP-10 — Layout : canonical/hreflang/favicon sur le HTML buildé', () => {
  it('EARS-43 : canonical + hreflang croisés en/fr + x-default vers la version EN, slugs du registre', () => {
    const pages = pagesBuildees();
    expect(pages.length).toBeGreaterThan(0);
    for (const { r, path } of pages) {
      const html = readFileSync(distHtml(path), 'utf8');
      expect(html, `${path} canonical`).toMatch(
        new RegExp(`<link rel="canonical" href="${SITE}${path}"`),
      );
      expect(html, `${path} hreflang en`).toMatch(
        new RegExp(`<link rel="alternate" hreflang="en" href="${SITE}${r.en}"`),
      );
      expect(html, `${path} hreflang fr`).toMatch(
        new RegExp(`<link rel="alternate" hreflang="fr" href="${SITE}${r.fr}"`),
      );
      expect(html, `${path} x-default`).toMatch(
        new RegExp(`<link rel="alternate" hreflang="x-default" href="${SITE}${r.en}"`),
      );
    }
  });

  it('EARS-47 : chaque page référence la favicon servie depuis public/', () => {
    expect(existsSync('public/favicon.svg')).toBe(true);
    for (const { path } of pagesBuildees()) {
      const html = readFileSync(distHtml(path), 'utf8');
      expect(html, path).toMatch(/<link rel="icon"[^>]*href="\/favicon\.svg"/);
    }
  });
});
