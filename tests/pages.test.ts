import { describe, it, expect, beforeAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, sep } from 'node:path';
import { routes, paire } from '../src/content/routes';
import { site, type Locale } from '../src/content/site';

const SITE = 'https://nexusinsight.io';

/** dist/<chemin>/index.html pour une route en format directory ('/fr/' → dist/fr/index.html). */
function distHtml(path: string): string {
  return join('dist', ...path.split('/').filter(Boolean), 'index.html');
}

/** Lit un fichier de dist/ par chemin relatif ('index.html', 'fr/index.html'). */
function lirePage(rel: string): string {
  return readFileSync(join('dist', ...rel.split('/')), 'utf8');
}

/** Tous les .html buildés, chemins relatifs à dist/ en séparateurs POSIX. */
function toutesLesPagesHtml(): string[] {
  return readdirSync('dist', { recursive: true })
    .map((f) => String(f).split(sep).join('/'))
    .filter((f) => f.endsWith('.html'));
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

describe('CAP-4 — home complète EN + FR (7 sections du wireframe validé)', () => {
  it("EARS-18/19 : la home EN rend les 7 sections dans l'ordre et 3 cards indexées", () => {
    const html = lirePage('index.html');
    const ordre = ['hero', 'offers', 'mechanism', 'proof', 'audiences', 'faq', 'cta-band'];
    const positions = ordre.map((id) => html.indexOf(`data-section="${id}"`));
    expect(positions.every((p, i) => p >= 0 && (i === 0 || p > positions[i - 1]))).toBe(true);
    for (const idx of ['01', '02', '03']) expect(html).toContain(`data-card-index="${idx}"`);
    expect(html).toMatch(/href="\/sprint\/"/);
    expect(html).toMatch(/href="\/build\/"/);
    expect(html).toMatch(/href="\/delivery\/"/);
  });

  it('EARS-20 : le mécanisme expose les 3 étapes et la punchline', () => {
    const html = lirePage('index.html');
    expect(html).toMatch(/frozen scope/i);
    expect(html).toMatch(/nobody signs a big number blind/i);
  });

  it('EARS-21 : la preuve mentionne le seul chiffre autorisé et lie vers founder', () => {
    const html = lirePage('index.html');
    expect(html).toMatch(/80,000 users/);
    expect(html).toMatch(/href="\/founder\/"/);
  });

  it("EARS-22 : 4 entrées audience avec leur porte d'entrée", () => {
    const html = lirePage('index.html');
    expect((html.match(/data-audience=/g) ?? []).length).toBe(4);
  });

  it('EARS-23 : la FAQ home compte 4 ou 5 entrées', () => {
    const n = (lirePage('index.html').match(/data-faq-item/g) ?? []).length;
    expect(n).toBeGreaterThanOrEqual(4);
    expect(n).toBeLessThanOrEqual(5);
  });

  it("EARS-9 : l'ancre offers/offres existe sur chaque home", () => {
    expect(lirePage('index.html')).toContain('id="offers"');
    expect(lirePage('fr/index.html')).toContain('id="offres"');
  });
});

describe('CAP-5 — pages packages ×6 sur le gabarit commun', () => {
  const PAGES_PKG = ['sprint/index.html', 'build/index.html', 'delivery/index.html',
    'fr/sprint/index.html', 'fr/build/index.html', 'fr/delivery/index.html'];

  it('EARS-24 : les 6 pages package existent et portent les 7 sections du gabarit', () => {
    for (const p of PAGES_PKG) {
      const html = lirePage(p);
      for (const s of ['hero', 'deliverables', 'exclusions', 'prerequisites', 'faq', 'crosslink']) {
        expect(html, `${p} sans section ${s}`).toContain(`data-section="${s}"`);
      }
    }
  });

  it('EARS-25 : 5 livrables Sprint, 5 livrables Build, comparatif 2 intensités Delivery', () => {
    expect((lirePage('sprint/index.html').match(/data-deliverable/g) ?? []).length).toBe(5);
    expect((lirePage('build/index.html').match(/data-deliverable/g) ?? []).length).toBe(5);
    expect((lirePage('delivery/index.html').match(/data-tier=/g) ?? []).length).toBe(2);
  });

  it('EARS-26 : chaque page package liste des exclusions', () => {
    for (const p of PAGES_PKG) {
      expect((lirePage(p).match(/data-exclusion/g) ?? []).length).toBeGreaterThanOrEqual(3);
    }
  });

  it('EARS-27 : /sprint expose prix fixe, 3 semaines, prérequis, validité 60 jours', () => {
    const html = lirePage('sprint/index.html');
    expect(html).toMatch(/\$11,000/);
    expect(html).toMatch(/3 weeks/i);
    expect(html).toMatch(/60 days/i);
    expect(html).toMatch(/48\s?h/i);
  });

  it('EARS-28 : /build expose avenant 48 h et garantie 4 semaines', () => {
    const html = lirePage('build/index.html');
    expect(html).toMatch(/48\s?h/i);
    expect(html).toMatch(/4(-|\s)week/i);
  });

  it('EARS-29 : /delivery expose les 2 intensités et la résiliation 30 jours', () => {
    const html = lirePage('delivery/index.html');
    expect(html).toMatch(/\$4,500/);
    expect(html).toMatch(/\$8,500/);
    expect(html).toMatch(/30(-|\s)day/i);
  });

  it('EARS-30 : cross-links Sprint→Build et Build→Delivery', () => {
    expect(lirePage('sprint/index.html')).toMatch(/data-section="crosslink"[\s\S]*?href="\/build\/"/);
    expect(lirePage('build/index.html')).toMatch(/data-section="crosslink"[\s\S]*?href="\/delivery\/"/);
  });
});

describe('CAP-6/7/8/9 — pages secondaires (method, founder, contact, legal) + 404', () => {
  it('EARS-31/32/33 : method expose jalons, stack et remote async', () => {
    const html = lirePage('method/index.html');
    for (const s of ['milestones', 'stack', 'remote']) expect(html).toContain(`data-section="${s}"`);
    expect(html).toMatch(/two(-|\s)week/i);
    expect(html).toMatch(/48\s?h/i);
  });

  it('EARS-34/35/36 : founder — honnêteté structurelle, preuves autorisées, lien perso', () => {
    const html = lirePage('founder/index.html');
    expect(html).toMatch(/kaankarabulut\.com/);
    expect(html).toMatch(/The Node/);
    expect(html).toMatch(/Drift/);
    expect(html).not.toMatch(/<img[^>]*(portrait|team|photo)/i);
  });

  it('EARS-38/39 : contact = mailto seul, aucun <form> sur tout le site', () => {
    expect(lirePage('contact/index.html')).toContain('mailto:kaan@nexusinsight.io');
    for (const f of toutesLesPagesHtml()) {
      expect(lirePage(f), `<form> trouvé dans ${f}`).not.toMatch(/<form[\s>]/i);
    }
  });

  it('EARS-40/41 : bloc légal NexusEvo complet + nom commercial', () => {
    for (const p of ['legal/index.html', 'fr/mentions-legales/index.html']) {
      const html = lirePage(p);
      expect(html).toMatch(/928 581 545/);
      expect(html).toMatch(/RCS Bobigny/);
      expect(html).toMatch(/FR95 928 581 545/);
      expect(html).toMatch(/Capsulerie/);
      expect(html).toMatch(/NexusEvo/);
      expect(html).toMatch(/nom commercial|trade name/);
    }
  });

  it('EARS-42 : noindex sur les 2 pages légales et NULLE part ailleurs', () => {
    for (const f of toutesLesPagesHtml()) {
      const attendu = f === 'legal/index.html' || f === 'fr/mentions-legales/index.html';
      expect(/name="robots" content="noindex"/.test(lirePage(f)), f).toBe(attendu);
    }
  });

  it('EARS-49/50 : 404.html buildée avec liens de reprise', () => {
    const html = lirePage('404.html');
    expect(html).toMatch(/href="\/"/);
    expect(html).toMatch(/href="\/fr\/"/);
  });
});
