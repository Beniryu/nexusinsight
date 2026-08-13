---
id: "08"
titre: "Harnais de tests sur le build (dist/) : SEO, hreflang, sitemap, OG, robots, nav/footer partout"
statut: passed
tentatives: 0
depends_on: [ "05", "06", "07" ]
ears: [ EARS-4, EARS-6, EARS-7, EARS-8, EARS-10, EARS-43, EARS-44, EARS-45, EARS-46, EARS-47 ]
---

## Objectif

Le fichier `tests/pages.test.ts` finalisé avec son harnais (build une fois, assertions sur `dist/`) et les suites transverses : gabarit commun présent partout, hreflang/canonical par paire, sitemap à 14 URLs indexables, OG locaux, robots.txt, favicon, aucun hôte externe dans le HTML buildé.

## Fichiers concernés

- Modifier : `tests/pages.test.ts` — harnais en tête de fichier (les suites des tâches 05/06/07 s'y branchent) :

```ts
import { beforeAll, describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { routes } from '../src/content/routes';

const DIST = 'dist';

export function lirePage(rel: string): string {
  return readFileSync(join(DIST, rel), 'utf8');
}

export function toutesLesPagesHtml(): string[] {
  const out: string[] = [];
  const marcher = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) marcher(p);
      else if (e.name.endsWith('.html')) out.push(p.slice(DIST.length + 1));
    }
  };
  marcher(DIST);
  return out;
}

beforeAll(() => {
  if (!existsSync(join(DIST, 'index.html'))) {
    execSync('npx astro build', { stdio: 'inherit', timeout: 180_000 });
  }
}, 200_000);
```

- Créer : `public/robots.txt` :

```
User-agent: *
Allow: /

Sitemap: https://nexusinsight.io/sitemap-index.xml
```

- Suites de tests transverses :

```ts
it('EARS-6/10 : nav et footer présents sur chaque page (nom en toutes lettres, NexusEvo, contact, site perso)', () => {
  for (const f of toutesLesPagesHtml()) {
    const html = lirePage(f);
    expect(html, `nav absente de ${f}`).toContain('data-component="nav"');
    expect(html, `footer absent de ${f}`).toContain('data-component="footer"');
    expect(html).toContain('NexusInsight');
    expect(html).toContain('NexusEvo');
    expect(html).toContain('kaan@nexusinsight.io');
    expect(html).toContain('kaankarabulut.com');
  }
});

it('EARS-7 : le sélecteur de langue pointe vers la page équivalente', () => {
  for (const r of routes) {
    const enFile = r.en === '/' ? 'index.html' : `${r.en.slice(1, -1)}/index.html`;
    const html = lirePage(enFile);
    expect(html, `sélecteur FR incorrect sur ${r.en}`).toMatch(new RegExp(`data-lang-switch[^>]*href="${r.fr}"`));
  }
});

it('EARS-8 : chaque CTA book-a-call mène au contact de la locale', () => {
  expect(lirePage('index.html')).toMatch(/data-cta="call"[^>]*href="\/contact\/"/);
  expect(lirePage('fr/index.html')).toMatch(/data-cta="call"[^>]*href="\/fr\/contact\/"/);
});

it('EARS-43 : canonical + hreflang croisés + x-default EN sur chaque paire', () => {
  for (const r of routes) {
    const enFile = r.en === '/' ? 'index.html' : `${r.en.slice(1, -1)}/index.html`;
    const html = lirePage(enFile);
    expect(html).toContain(`rel="canonical" href="https://nexusinsight.io${r.en}"`);
    expect(html).toContain(`hreflang="fr" href="https://nexusinsight.io${r.fr}"`);
    expect(html).toContain(`hreflang="x-default" href="https://nexusinsight.io${r.en}"`);
  }
});

it('EARS-44 : le sitemap contient les 14 pages indexables et exclut les légales', () => {
  const sm = readdirSync(DIST).filter((f) => f.startsWith('sitemap'));
  const contenu = sm.map((f) => readFileSync(join(DIST, f), 'utf8')).join('');
  expect(contenu).not.toContain('/legal');
  expect(contenu).not.toContain('/mentions-legales');
  const indexables = routes.filter((r) => !r.noindex);
  for (const r of indexables) expect(contenu).toContain(`https://nexusinsight.io${r.en}`);
  expect((contenu.match(/<loc>/g) ?? []).length).toBe(indexables.length * 2);
});

it('EARS-45 : OG complet avec og:image locale en URL absolue', () => {
  for (const f of toutesLesPagesHtml().filter((f) => f !== '404.html')) {
    const html = lirePage(f);
    expect(html).toMatch(/property="og:image" content="https:\/\/nexusinsight\.io\/og\/og-(en|fr)\.png"/);
  }
});

it('EARS-46 : robots.txt servi et référençant le sitemap', () => {
  const robots = lirePage('robots.txt');
  expect(robots).toMatch(/Allow: \//);
  expect(robots).toMatch(/Sitemap: https:\/\/nexusinsight\.io\/sitemap/);
});

it('EARS-47 : favicon référencée depuis public/', () => {
  expect(lirePage('index.html')).toMatch(/rel="icon" href="\/favicon\.svg"/);
});

it('EARS-4 : aucun hôte externe dans le HTML buildé (hors liens sortants volontaires)', () => {
  for (const f of toutesLesPagesHtml()) {
    const html = lirePage(f);
    expect(html).not.toMatch(/fonts\.googleapis\.com|api\.fontshare\.com|cdn\.jsdelivr|unpkg\.com/);
    expect(html).not.toMatch(/<(script|link)[^>]+(src|href)="https?:\/\//);
  }
});
```

Conventions : la Nav porte `data-component="nav"` + `data-lang-switch` sur le sélecteur + `data-cta="call"` sur le CTA ; le Footer porte `data-component="footer"` (à poser en tâche 04 — c'est le contrat).

## Definition of done

- `npm test` vert INTÉGRALEMENT (fonts, i18n, content, design, pages), `npm run check` vert, `npm run build` vert.
- Les 4 commandes de no-gos du pitch sortent en 0 dans le worktree.
- EARS-4, 6, 7, 8, 10, 43..47 verts de bout en bout.
