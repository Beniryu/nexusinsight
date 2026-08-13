---
id: "03"
titre: "Modèle de contenu bilingue complet (site.ts) + tests de conformité de la copy"
statut: passed
tentatives: 0
depends_on: []
ears: [ EARS-11, EARS-12, EARS-13, EARS-14, EARS-15, EARS-16, EARS-17 ]
---

## Objectif

`src/content/site.ts` étendu à TOUT le contenu du site (nav, footer, home complète, 3 packages, method, founder, contact, legal, 404), EN et FR en pairs idiomatiques, voix « nous ». Le fond vient de `brand/OFFERS.md` (prix, livrables, exclusions, FAQ — repris tels quels) et `brand/BRAND.md` (voix, faits autorisés, bloc légal §7).

## Fichiers concernés

- Modifier : `src/content/site.ts` — étendre l'interface `Copy` : `nav {offers, method, founder, cta}`, `footer {legal, contact, founderSite}`, `home {packagesTitle, packages[3] {index, name, duration, price, priceMeta, blurb, href}, mechanism {title, steps[3], punchline}, proof {title, text, link}, audiences[4] {label, text, href}, faq[] {q, a}, ctaBand {text, cta}}`, `pages` par route (`sprint`, `build`, `delivery`, `method`, `founder`, `contact`, `legal`, `notFound`) avec `meta {title, description}` + sections structurées par page (livrables numérotés, déroulé, exclusions, prérequis, faq, crossLink pour les packages).
- Règles de contenu NON négociables :
  - Prix : pages EN affichent USD ($11,000 / from $29,000 / $4,500-$8,500 + « excl. VAT »), pages FR affichent EUR (9 500 € / à partir de 25 000 € / 3 900-7 500 € + « HT »). Montants strictement identiques à `brand/OFFERS.md`.
  - Zéro emoji, zéro « audit », zéro « passionate/expert/seasoned/world-class/results-driven », aucune promesse chiffrée client. Seul chiffre autorisé : « plus de 80 000 utilisateurs, une centaine de pays » (proof).
  - Voix « nous », sentence case, pas de point final aux titres.
- Créer : `tests/content.test.ts`

## Test d'abord

```ts
import { describe, it, expect } from 'vitest';
import { site } from '../src/content/site';

const texteDe = (obj: unknown): string => JSON.stringify(obj);

describe('CAP-3 — conformité de la copy', () => {
  it('EARS-13 : prix conformes à OFFERS.md — EUR côté FR, USD côté EN', () => {
    const fr = texteDe(site.fr);
    const en = texteDe(site.en);
    expect(fr).toMatch(/9 500\s?€|9 500\s?€/);
    expect(fr).toMatch(/25 000\s?€|25 000\s?€/);
    expect(fr).toMatch(/3 900|3 900/);
    expect(fr).toMatch(/7 500|7 500/);
    expect(en).toMatch(/\$11,000/);
    expect(en).toMatch(/\$29,000/);
    expect(en).toMatch(/\$4,500/);
    expect(en).toMatch(/\$8,500/);
  });

  it('EARS-14 : mention HT (FR) / excl. VAT (EN) présente', () => {
    expect(texteDe(site.fr)).toMatch(/HT/);
    expect(texteDe(site.en)).toMatch(/excl\. VAT/);
  });

  it('EARS-15 : aucun emoji dans la copy', () => {
    expect(texteDe(site)).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
  });

  it('EARS-16 : vocabulaire interdit absent', () => {
    const tout = texteDe(site).toLowerCase();
    for (const mot of ['audit', 'passionate', 'passionné', 'seasoned', 'world-class', 'results-driven']) {
      expect(tout, `mot interdit trouvé : ${mot}`).not.toContain(mot);
    }
    expect(tout).not.toMatch(/\bexpert\b/);
  });
});
```

`tests/i18n.test.ts` (déjà en place) couvre mécaniquement EARS-11 (parité des clés sur l'objet étendu, aucune valeur vide) ; y AJOUTER pour EARS-12 :

```ts
it('EARS-12 : meta.title et meta.description diffèrent entre EN et FR pour chaque page', () => {
  const pagesEn = { home: site.en.meta, ...Object.fromEntries(Object.entries(site.en.pages).map(([k, v]) => [k, v.meta])) };
  const pagesFr = { home: site.fr.meta, ...Object.fromEntries(Object.entries(site.fr.pages).map(([k, v]) => [k, v.meta])) };
  for (const k of Object.keys(pagesEn)) {
    expect(pagesFr[k].title, `title identique EN/FR sur ${k}`).not.toBe(pagesEn[k].title);
    expect(pagesFr[k].description, `description identique EN/FR sur ${k}`).not.toBe(pagesEn[k].description);
  }
});
```

EARS-17 (voix « nous », registre) : `[test: manual]` — relecture humaine au rapport final, pas de test mécanique.

## Definition of done

- `npm test` vert (parité complète incluse), `npm run check` vert.
- Tout le texte du site vit dans `site.ts` — aucune chaîne en dur dans les pages (hors attributs techniques).
- EARS-11..16 couverts en auto, EARS-17 documenté pour revue manuelle.
