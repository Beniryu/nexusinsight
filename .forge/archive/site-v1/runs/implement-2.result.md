---
statut: passed
resume: >-
  Tâche 02 verte en TDD strict : parité des routes (EARS-48) dans tests/i18n.test.ts et
  hreflang/canonical/favicon sur HTML buildé (EARS-43/47) dans tests/pages.test.ts, rouges puis
  verts ; routes.ts créé, Layout dérivé de paire(path) (noindex, og:image absolu, favicon),
  favicon.svg + og-en/fr.png 1200×630 committés. 10/10 tests, check et build verts, NG-1..4 OK.
---

# Run implement-2 — tâche 02 (registre des routes EN↔FR + Layout enrichi)

## Ce qui a été fait

- Tests ROUGES d'abord — commit `6a74e0c` :
  - `tests/i18n.test.ts` : bloc « parité des routes EN/FR » (EARS-48) avec le code exact de la
    tâche (préfixes cohérents, unicité des slugs EN et FR).
  - `tests/pages.test.ts` créé (fichier de `plan.md:mapping_tests` pour EARS-43/47) : harnais
    `astro build` en beforeAll puis assertions sur `dist/` — canonical + hreflang croisés en/fr
    + x-default vers la version EN dérivés du registre (EARS-43), favicon référencée depuis
    `public/` (EARS-47). Le harnais itère sur les routes du registre déjà buildées : il couvrira
    mécaniquement les 16 pages quand les tâches 05-07 les créeront (bout en bout confirmé en 08).
  - Rouge vérifié : les deux fichiers échouent (`routes.ts` inexistant).
- Implémentation — commit `2715d8d` :
  - `src/content/routes.ts` : registre des 8 paires EN↔FR (slugs FR idiomatiques `/fr/methode/`,
    `/fr/fondateur/`, `/fr/mentions-legales/`), flag `noindex` sur `/legal/`, helper `paire()`.
  - `src/layouts/Layout.astro` : prop `path` seule (plus d'`altPath`), canonical + hreflang
    en/fr + x-default EN dérivés de `paire(path)`, `<meta name="robots" content="noindex">` si
    la route le déclare, `og:image` absolu `https://nexusinsight.io/og/og-<locale>.png`,
    `<link rel="icon" href="/favicon.svg">`.
  - `src/pages/index.astro` + `src/pages/fr/index.astro` : adaptés à la nouvelle signature.
  - `public/favicon.svg` : « N » géométrique écrit à la main (fond graphite `#1E2126` arrondi,
    N `#F5F6F8`, point cuivre `#C97E48` sur la baseline) — rendu vérifié visuellement.
  - `public/og/og-en.png`, `og-fr.png` (1200×630 vérifié par sips) générés par
    `npx @resvg/resvg-js-cli` ponctuel depuis les SVG sources committés `public/og/src/` —
    aucune dépendance ajoutée au package.json. Rendu vérifié visuellement (accents FR OK).

## Vérifications

- `npm test` : 10/10 verts (fonts 4, i18n 4, pages 2). `npm run check` : 0 erreur/0 warning.
  `npm run build` : OK (2 pages + sitemap).
- HTML buildé : `og:image` absolu par locale présent sur `/` et `/fr/`.
- No-gos rejoués : NG-1 (deps ⊆ {astro, @astrojs/sitemap}), NG-2 (grep CDN vide), NG-3
  (statique pur), NG-4 (Dockerfile/nginx.conf intouchés) — tous OK.

## Hypothèses retenues (headless)

1. **`noindex` dérivé du registre, pas une prop** : la tâche dit « émet noindex si la route
   l'exige » et le DoD « uniquement si la route le déclare » — le Layout lit `paire(path).noindex`
   directement ; aucune prop redondante, aucune divergence possible entre page et registre.
2. **CLI resvg** : le paquet cité `@resvg/resvg-cli` n'existe pas sous ce nom ; le CLI officiel
   est `@resvg/resvg-js-cli` — utilisé en `npx --yes` ponctuel, conformément à l'esprit de la
   tâche (rien dans package.json).
3. **Fonts des OG** : resvg ne lit pas les woff2 committés ; les PNG utilisent Helvetica système
   (aucun EARS n'impose de famille sur l'og:image, EARS-45 exige seulement un asset committé en
   URL absolue). Documenté dans les SVG sources.
4. **Portée des tests EARS-43/47** : la tâche 02 renvoie la confirmation bout en bout à la
   tâche 08, mais le prompt exige les tests des 3 EARS aux fichiers du mapping — écrits ici sur
   les pages existantes (`/`, `/fr/`), extensibles sans modification aux 14 autres.

## Commits

- `6a74e0c` — tests rouges (EARS-43/47/48)
- `2715d8d` — implémentation verte (routes.ts, Layout, favicon, OG, pages adaptées)
