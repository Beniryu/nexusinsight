---
statut: passed
resume: >-
  Tâche 01 verte en TDD strict : tests/fonts.test.ts écrit rouge puis vert (7/7 dont EARS-1..5),
  6 woff2 committés dans public/fonts/ + LICENSES.md (FFL ITF + OFL complètes), fonts.css
  (font-display: swap, src locales) importé dans Layout.astro ; check et build verts, NG-2 vérifié.
---

# Run implement-1 — tâche 01 (fonts self-hostées)

## Ce qui a été fait

- `tests/fonts.test.ts` écrit d'abord avec le code exact de la tâche, vérifié ROUGE
  (3 échecs / 4, EARS-4 déjà vert car `src/` était sain) — commit `6781666`.
- Téléchargement au moment de l'implémentation (jamais au rendu) : Clash Display et Switzer
  depuis les archives officielles Fontshare, JetBrains Mono v2.304 depuis la release GitHub
  officielle. Magic bytes `wOF2` vérifiés sur les 6 fichiers.
- `public/fonts/` : ClashDisplay-{Medium,Semibold}, Switzer-{Regular,Semibold},
  JetBrainsMono-{Regular,Medium} + `LICENSES.md` (textes complets FFL.txt et OFL.txt copiés
  des archives officielles) — commit `07b8625`.
- `src/styles/fonts.css` : 6 `@font-face`, `font-display: swap`, `src: url('/fonts/…')`,
  graisses conformes EARS-2 (500/600, 400/600, 400/500), familles alignées sur les tokens
  (`'Clash Display'`, `'Switzer'`, `'JetBrains Mono'`).
- `src/layouts/Layout.astro` : `import '../styles/fonts.css';` ajouté avant tokens.css.

## Vérifications

- `npm test` : 7/7 verts (fonts + i18n). `npm run check` : 0 erreur. `npm run build` : OK.
- CSS buildé : les 6 `url(/fonts/*.woff2)` présents, fonts copiées dans `dist/fonts/`.
- Grep NG-2 (`fonts.googleapis.com|api.fontshare.com|cdn.jsdelivr|unpkg.com`) : vide sur
  `src/`, `public/` ET `dist/`.

## Hypothèses retenues (headless)

1. **Licence ITF** : Fontshare livre la licence sous le nom de fichier `FFL.txt`
   (« Free Font EULA » de l'Indian Type Foundry) ; c'est bien la licence connue comme
   « ITF Free Font License », reproduite intégralement et titrée ainsi dans `LICENSES.md`.
2. **Subset latin** : les woff2 WEB de Fontshare sont déjà en subset latin (~16-20 Ko).
   Pour JetBrains Mono, les webfonts officiels (~92 Ko) sont gardés NON modifiés : l'OFL
   interdit de redistribuer une version modifiée (re-subset) sous le Reserved Font Name
   « JetBrains Mono » sans renommage — le build officiel est le choix conforme.
3. **URL Fontshare dans LICENSES.md** : la citation `api.fontshare.com` dans le tableau des
   sources aurait fait un faux positif au grep NG-2/EARS-4 sur `dist/` (public/ est copié tel
   quel) ; remplacée par « fontshare.com » qui garde la traçabilité hors pattern CDN.

## Commits

- `6781666` — test rouge CAP-1 (EARS-1..5)
- `07b8625` — implémentation verte (woff2 + licences + fonts.css + import Layout)
