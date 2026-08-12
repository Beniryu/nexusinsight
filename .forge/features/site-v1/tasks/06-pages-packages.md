---
id: "06"
titre: "Pages packages ×6 (/sprint /build /delivery + paires FR) via gabarit commun"
statut: pending
tentatives: 0
depends_on: ["03", "04"]
ears: [EARS-24, EARS-25, EARS-26, EARS-27, EARS-28, EARS-29, EARS-30]
---

## Objectif

Les six pages package sur un gabarit commun `PackagePage.astro` : hero (nom, promesse factuelle, prix, durée), livrables numérotés, déroulé, « What's not included », prérequis, FAQ, cross-link logique + CTA. Fond strictement issu de `site[locale].pages.{sprint,build,delivery}` (lui-même repris de `brand/OFFERS.md` en tâche 03).

## Fichiers concernés

- Créer : `src/components/PackagePage.astro` — props `{locale, path, page}` (le sous-objet de `site[locale].pages`) ; sections avec les mêmes conventions testables : `data-section="hero|deliverables|timeline|exclusions|prerequisites|faq|crosslink"`.
- Créer : `src/pages/sprint.astro`, `src/pages/build.astro`, `src/pages/delivery.astro` (EN) et `src/pages/fr/sprint.astro`, `src/pages/fr/build.astro`, `src/pages/fr/delivery.astro` (FR) — chacune ~10 lignes : import du gabarit + `site[locale].pages.<pkg>` + `path`.
- Modifier : `tests/pages.test.ts` — suite « packages ».

## Test d'abord

```ts
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
```

Conventions : `data-deliverable` par livrable, `data-exclusion` par exclusion, `data-tier` par intensité Delivery.

## Definition of done

- `npm test`, `npm run check`, `npm run build` verts ; 6 routes servies, symétriques EN/FR.
- EARS-24..30 verts sur le HTML buildé.
