---
statut: passed
resume: >-
  Harnais transverse finalisé sur dist/ : suite CAP-10 ajoutée à tests/pages.test.ts
  (EARS-44 sitemap = exactement 14 URLs indexables sans légales, EARS-45 OG complet + og:image
  locale absolue, EARS-46 robots.txt, EARS-4 zéro hôte externe) ; public/robots.txt créé.
  npm test 44/44 vert, npm run check 0 erreur, build 17 pages, les 4 no-gos sortent en 0.
---

# Run implement-8 — Harnais de tests sur le build (dist/)

## Ce qui a été fait

- **TDD** : suite `CAP-10 — sitemap, OG, robots et hygiène réseau sur le build complet`
  ajoutée en fin de `tests/pages.test.ts` (commit `d82999a`, ROUGE vérifié sur EARS-46),
  puis `public/robots.txt` créé pour passer au VERT (commit suivant).
- **EARS-44** : lecture de tous les `dist/sitemap*.xml`, extraction des `<loc>` de pages
  (les renvois `.xml` du sitemap-index sont écartés — le code indicatif de la fiche tâche
  comptait 15 `<loc>` au lieu de 14), égalité stricte avec les 14 URLs dérivées de
  `routes.filter(!noindex)`, absence de `/legal` et `/mentions-legales`.
- **EARS-45** : sur chaque page du registre (404 hors registre, donc exclue) : `og:title`,
  `og:description`, `og:url = site+path`, `og:image = https://nexusinsight.io/og/og-{en|fr}.png`,
  et présence des 2 PNG dans `public/og/`.
- **EARS-46** : `public/robots.txt` (User-agent *, `Allow: /`, `Sitemap: …/sitemap-index.xml`),
  vérifié copié dans `dist/` par le build.
- **EARS-4** (volet dist, complément du volet src/ déjà dans `tests/fonts.test.ts`) : aucun
  hôte de fonts/CDN, et toute URL absolue portée par `<script>`/`<link>` doit être
  `https://nexusinsight.io` (canonical/hreflang tolérés, liens sortants `<a>` volontaires ignorés).
- **EARS-6/7/8/10/43/47** : déjà couverts par les suites CAP-2/CAP-10 existantes du fichier,
  qui itèrent sur toutes les pages buildées du registre — vérifiés verts dans ce run.

## Hypothèses retenues

- Convention `data-cta="contact"` (posée en tâche 04, tests verts) conservée au lieu du
  `data-cta="call"` indicatif de la fiche tâche — le contrat réel du repo prime.
- Harnais conservé en rebuild systématique (`execFileSync astro build` en beforeAll, ~0,5 s)
  plutôt que le build conditionnel de la fiche : pas de risque de `dist/` périmé.
- EARS-44/45/4 étaient déjà satisfaits par les implémentations des tâches 01/02 (config
  sitemap, Layout OG, fonts locales) : seul EARS-46 était réellement rouge ; les tests
  verrouillent désormais les quatre.

## Vérification

- `npm test` : 5 fichiers, 44/44 verts (fonts, i18n, content, design, pages).
- `npm run check` : 0 erreur, 0 warning, 0 hint.
- `npm run build` : 17 pages + sitemap-index.xml.
- No-gos NG-1 (deps), NG-2 (hôtes externes src/), NG-3 (statique pur), NG-4 (infra gelée) : RC=0.
- Restent `[test: manual]` pour la revue humaine au rapport : EARS-17, 37, 53, 54, 55.
