import { describe, it, expect, beforeAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { routes, paire } from '../src/content/routes';
import { site, type Locale } from '../src/content/site';

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

describe('CAP-2 — nav, footer et sélecteur de langue sur le HTML buildé', () => {
  const localeDe = (path: string): Locale => (path.startsWith('/fr/') ? 'fr' : 'en');
  const hrefDe = (tag: string): string | undefined => tag.match(/href="([^"]+)"/)?.[1];

  it('EARS-6 : chaque page rend la nav — « NexusInsight » en toutes lettres, liens localisés, sélecteur, CTA', () => {
    const pages = pagesBuildees();
    expect(pages.length).toBeGreaterThan(0);
    for (const { path } of pages) {
      const html = readFileSync(distHtml(path), 'utf8');
      const nav = html.match(/<nav[^>]*data-component="nav"[\s\S]*?<\/nav>/)?.[0];
      expect(nav, `${path} : nav absente`).toBeTruthy();
      expect(nav).toContain('NexusInsight');
      const t = site[localeDe(path)].nav;
      for (const label of [t.offers, t.method, t.founder, t.cta]) {
        expect(nav, `${path} : « ${label} » manquant dans la nav`).toContain(label);
      }
      expect(nav, `${path} : sélecteur de langue absent`).toMatch(/data-lang-switch/);
    }
  });

  it('EARS-7 : le sélecteur de langue mène à la page équivalente, jamais à la home par défaut', () => {
    for (const { r, path } of pagesBuildees()) {
      const html = readFileSync(distHtml(path), 'utf8');
      const tag = html.match(/<a[^>]*data-lang-switch[^>]*>/)?.[0] ?? '';
      const attendu = localeDe(path) === 'en' ? r.fr : r.en;
      expect(hrefDe(tag), `${path} : cible du sélecteur`).toBe(attendu);
    }
  });

  it('EARS-8 : tout CTA data-cta="contact" mène à la page contact de la locale', () => {
    for (const { path } of pagesBuildees()) {
      const html = readFileSync(distHtml(path), 'utf8');
      const ctas = html.match(/<a[^>]*data-cta="contact"[^>]*>/g) ?? [];
      expect(ctas.length, `${path} : aucun CTA contact`).toBeGreaterThan(0);
      const contact = paire('/contact/')[localeDe(path)];
      for (const tag of ctas) {
        expect(hrefDe(tag), `${path} : ${tag}`).toBe(contact);
      }
    }
  });

  it('EARS-10 : chaque page rend le footer — NexusEvo SARL, mentions légales, contact, site du fondateur', () => {
    for (const { path } of pagesBuildees()) {
      const html = readFileSync(distHtml(path), 'utf8');
      const footer = html.match(/<footer[^>]*data-component="footer"[\s\S]*?<\/footer>/)?.[0];
      expect(footer, `${path} : footer absent`).toBeTruthy();
      expect(footer).toContain('NexusEvo SARL');
      expect(footer, `${path} : lien mentions légales`).toContain(
        `href="${paire('/legal/')[localeDe(path)]}"`,
      );
      expect(footer).toContain('mailto:kaan@nexusinsight.io');
      expect(footer).toContain('https://kaankarabulut.com');
      expect(footer, `${path} : libellé du site personnel du fondateur`).toMatch(
        localeDe(path) === 'en' ? /personal site/ : /personnel du fondateur/,
      );
    }
  });
});
