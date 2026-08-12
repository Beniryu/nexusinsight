---
statut: passed
resume: >-
  Tâche 07 en TDD strict : 6 tests EARS-31..36,38..42,49,50 écrits dans tests/pages.test.ts
  (rouges vérifiés, commit e23e67b), puis 4 gabarits + 8 pages EN/FR + 404 E3 (commit 35d84f5).
  npm test 40/40, npm run check 0 erreur, build 17 pages, Dockerfile/nginx.conf intouchés.
---

# Run implement-7 — Pages method, founder, contact, legal (×2) + 404

## Ce qui a été fait

- **Tests d'abord (rouge)** : suite « CAP-6/7/8/9 — pages secondaires + 404 » ajoutée à
  `tests/pages.test.ts` avec le code exact du fichier de tâche, plus le helper
  `toutesLesPagesHtml()` (scan récursif des `.html` de `dist/`, chemins POSIX) requis par
  EARS-39 et EARS-42. Rouge vérifié : 5 failed / 20 passed (ENOENT sur les pages absentes).
  Commit `e23e67b`.
- **Implémentation (vert)** :
  - `src/components/MethodPage.astro` — `data-section="milestones|stack|remote"` : jalons +
    règle d'avenant 48 h en encart cuivre, stack coût de possession + propriété du code,
    remote async US avec créneau hebdo EU/US East. `CtaBand` en pied.
  - `src/components/FounderPage.astro` — honnêteté structurelle, faits limités à BRAND.md
    (TotalEnergies sobre, associé The Node, PO Drift, Rémunet « réalisation du fondateur »),
    lien `kaankarabulut.com`, aucune balise `<img>`.
  - `src/components/ContactPage.astro` — `mailto:kaan@nexusinsight.io` unique action,
    aucun `<form>`, note « pas de formulaire », pas de CtaBand (redondante ici).
  - `src/components/LegalPage.astro` — bloc éditeur NexusEvo complet + phrase nom commercial ;
    noindex hérité du Layout via le flag du registre `routes.ts`.
  - `src/pages/{method,founder,contact,legal}.astro` +
    `src/pages/fr/{methode,fondateur,contact,mentions-legales}.astro` — 8 pages fines
    (gabarit + `site[locale].pages.*` + path du registre).
  - `src/pages/404.astro` — page autonome hors registre (pas de canonical/hreflang), plein
    graphite E3, code 404 en mono cuivre, liens de reprise `/` et `/fr/`, buildée en
    `dist/404.html`.
  - `src/content/site.ts` — export des types `MethodPage/FounderPage/ContactPage/LegalPage` ;
    2 retouches EN pour coller aux assertions : « Two-week milestones » (EARS-31 exige
    `two-week`) et « RCS Bobigny (Trade and Companies Register) » (EARS-40 exige le littéral
    « RCS Bobigny » sur les 2 locales).
  - Commit `35d84f5`.

## Vérifications (DoD)

- `npm test` : 40/40 verts (dont les 6 nouveaux sur le HTML buildé).
- `npm run check` : 0 erreur, 0 warning (36 fichiers).
- `npm run build` : 17 pages, sitemap excluant legal/mentions-legales (config existante).
- `Dockerfile` et `nginx.conf` intouchés (NG-4) ; `package.json → dependencies` intouché (NG-1).

## Hypothèses retenues

- La 404 n'utilise pas le Layout : son chemin n'existe pas dans le registre des routes
  (`paire()` lancerait) et canonical/hreflang n'ont pas de sens pour une page d'erreur servie
  par nginx sur toutes les URL. Elle reste bilingue légère (texte EN + FR, les 2 liens).
- Pas de `noindex` sur la 404 : le test EARS-42 l'interdit hors pages légales (nginx la sert
  avec un statut 404, non indexable de fait).
- EARS-42 était structurellement vert dès le rouge (aucune page légale buildée → aucun noindex
  attendu) ; il devient discriminant depuis que `/legal/` et `/fr/mentions-legales/` existent.
