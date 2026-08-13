---
feature: site-v1
statut: valide
valide_par: kaan
mapping_tests:
  - { ears: EARS-1, fichier: "tests/fonts.test.ts" }
  - { ears: EARS-2, fichier: "tests/fonts.test.ts" }
  - { ears: EARS-3, fichier: "tests/fonts.test.ts" }
  - { ears: EARS-4, fichier: "tests/fonts.test.ts" }
  - { ears: EARS-5, fichier: "tests/fonts.test.ts" }
  - { ears: EARS-6, fichier: "tests/pages.test.ts" }
  - { ears: EARS-7, fichier: "tests/pages.test.ts" }
  - { ears: EARS-8, fichier: "tests/pages.test.ts" }
  - { ears: EARS-9, fichier: "tests/pages.test.ts" }
  - { ears: EARS-10, fichier: "tests/pages.test.ts" }
  - { ears: EARS-11, fichier: "tests/i18n.test.ts" }
  - { ears: EARS-12, fichier: "tests/i18n.test.ts" }
  - { ears: EARS-13, fichier: "tests/content.test.ts" }
  - { ears: EARS-14, fichier: "tests/content.test.ts" }
  - { ears: EARS-15, fichier: "tests/content.test.ts" }
  - { ears: EARS-16, fichier: "tests/content.test.ts" }
  - { ears: EARS-18, fichier: "tests/pages.test.ts" }
  - { ears: EARS-19, fichier: "tests/pages.test.ts" }
  - { ears: EARS-20, fichier: "tests/pages.test.ts" }
  - { ears: EARS-21, fichier: "tests/pages.test.ts" }
  - { ears: EARS-22, fichier: "tests/pages.test.ts" }
  - { ears: EARS-23, fichier: "tests/pages.test.ts" }
  - { ears: EARS-24, fichier: "tests/pages.test.ts" }
  - { ears: EARS-25, fichier: "tests/pages.test.ts" }
  - { ears: EARS-26, fichier: "tests/pages.test.ts" }
  - { ears: EARS-27, fichier: "tests/pages.test.ts" }
  - { ears: EARS-28, fichier: "tests/pages.test.ts" }
  - { ears: EARS-29, fichier: "tests/pages.test.ts" }
  - { ears: EARS-30, fichier: "tests/pages.test.ts" }
  - { ears: EARS-31, fichier: "tests/pages.test.ts" }
  - { ears: EARS-32, fichier: "tests/pages.test.ts" }
  - { ears: EARS-33, fichier: "tests/pages.test.ts" }
  - { ears: EARS-34, fichier: "tests/pages.test.ts" }
  - { ears: EARS-35, fichier: "tests/pages.test.ts" }
  - { ears: EARS-36, fichier: "tests/pages.test.ts" }
  - { ears: EARS-38, fichier: "tests/pages.test.ts" }
  - { ears: EARS-39, fichier: "tests/pages.test.ts" }
  - { ears: EARS-40, fichier: "tests/pages.test.ts" }
  - { ears: EARS-41, fichier: "tests/pages.test.ts" }
  - { ears: EARS-42, fichier: "tests/pages.test.ts" }
  - { ears: EARS-43, fichier: "tests/pages.test.ts" }
  - { ears: EARS-44, fichier: "tests/pages.test.ts" }
  - { ears: EARS-45, fichier: "tests/pages.test.ts" }
  - { ears: EARS-46, fichier: "tests/pages.test.ts" }
  - { ears: EARS-47, fichier: "tests/pages.test.ts" }
  - { ears: EARS-48, fichier: "tests/i18n.test.ts" }
  - { ears: EARS-49, fichier: "tests/pages.test.ts" }
  - { ears: EARS-50, fichier: "tests/pages.test.ts" }
  - { ears: EARS-51, fichier: "tests/design.test.ts" }
  - { ears: EARS-52, fichier: "tests/design.test.ts" }
etapes_pipeline:
  implement:   { max_turns: 150, timeout_min: 120 }
  review:      { max_turns: 60, timeout_min: 30 }
  fix:         { max_turns: 80, timeout_min: 45 }
  verify:      { max_turns: 20, timeout_min: 20 }
  test_fix:    { max_turns: 60, timeout_min: 30 }
  deploy_test: { max_turns: 30, timeout_min: 20 }
  report:      { max_turns: 30, timeout_min: 15 }
---

# Plan — Site vitrine NexusInsight v1 (EN/FR)

## Carte des fichiers

**Créations**
- `public/fonts/*.woff2` (×6 : Clash Display 500/600, Switzer 400/600, JetBrains Mono 400/500) + `public/fonts/LICENSES.md` — CAP-1.
- `public/favicon.svg`, `public/og/og-en.png`, `public/og/og-fr.png` (1200×630, graphite/cuivre, SVG source sous `public/og/src/`), `public/robots.txt` — CAP-10.
- `src/styles/fonts.css` — les 6 `@font-face` (`font-display: swap`, src locales).
- `src/content/routes.ts` — registre des paires EN↔FR, SOURCE UNIQUE des slugs FR idiomatiques (`/fr/methode/`, `/fr/fondateur/`, `/fr/mentions-legales/`) + flag `noindex`. Consommé par Layout, Nav et les tests.
- `src/components/Nav.astro`, `Footer.astro`, `CtaBand.astro`, `OfferCard.astro`, `FactCard.astro` — le kit E3 partagé (`data-component`, `data-lang-switch`, `data-cta` = contrat de testabilité).
- `src/components/PackagePage.astro` — gabarit des 6 pages package.
- Pages : `src/pages/{sprint,build,delivery,method,founder,contact,legal,404}.astro` + `src/pages/fr/{sprint,build,delivery,methode,fondateur,contact,mentions-legales}.astro`.
- Tests : `tests/fonts.test.ts`, `tests/content.test.ts`, `tests/design.test.ts`, `tests/pages.test.ts` (harnais : `astro build` une fois en beforeAll, assertions sur `dist/`).

**Modifications**
- `src/layouts/Layout.astro` — hreflang/canonical/x-default dérivés de `paire(path)`, `og:image` absolu, prop noindex, favicon, import fonts.css, Nav/Footer autour du slot.
- `src/content/site.ts` — modèle de contenu COMPLET bilingue (nav, footer, home, 3 packages, method, founder, contact, legal, 404) ; fond strictement repris de `brand/OFFERS.md`/`brand/BRAND.md`.
- `src/pages/index.astro` + `src/pages/fr/index.astro` — les 7 sections du wireframe validé.
- `tests/i18n.test.ts` — parité étendue (meta par page ≠ EN/FR, parité des routes).

**Intouchés (no-gos)** : `Dockerfile`, `nginx.conf` (NG-4), `package.json → dependencies` (NG-1).

## Approche

1. **Contenu séparé du rendu** : tout le texte vit dans `site.ts` (testable sans build), les slugs dans `routes.ts`. Les pages sont des assemblages fins de composants + contenu.
2. **Testabilité par contrat** : le HTML porte des attributs `data-*` stables (`data-section`, `data-card-index`, `data-deliverable`, `data-exclusion`, `data-tier`, `data-audience`, `data-faq-item`, `data-component`, `data-lang-switch`, `data-cta`) — les tests ne dépendent jamais du style ni des textes marketés.
3. **Deux niveaux de tests** : source (fonts, contenu, design, parité) sans build ; bout en bout sur `dist/` (pages, SEO) avec un seul build partagé en beforeAll.
4. **Réutilisation** : Layout/hero/tokens du scaffold conservés ; le pattern Dockerfile→nginx éprouvé (kaankarabulut) n'est pas modifié.
5. **Fonts** : téléchargées depuis Fontshare/GitHub AU MOMENT de l'implémentation (réseau autorisé sur la machine de build, jamais au rendu), committées, licences incluses.

## Tâches

Voir `tasks/01-…md` à `tasks/08-…md`. Ordre : 01/02/03 indépendantes → 04 (composants) → 05/06/07 (pages, parallélisables) → 08 (harnais transverse). Chaque tâche embarque son « Test d'abord » avec le code réel des assertions.

## Vérification

- Baseline verte rejouée à la clôture de cette gate (install `npm ci` RC=0, test `npm test` RC=0, dans le worktree — vérifié par la ligne « baseline executee dans »).
- L'étape `verify` de l'orchestrateur rejouera mécaniquement : `npm run check` (lint + typecheck), `npm test`, puis les 4 commandes `verif` des no-gos du pitch (NG-1 dépendances, NG-2 hôtes externes, NG-3 statique pur, NG-4 infra gelée).
- Critères `[test: manual]` (EARS-17 voix, 37 pas de portrait, 53 règles E3, 54 responsive, 55 Lighthouse ≥ 90) : revue humaine au rapport, avant promotion prod.
