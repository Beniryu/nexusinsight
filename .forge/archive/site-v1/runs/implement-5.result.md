---
statut: passed
resume: >-
  Homes EN/FR complètes (7 sections du wireframe : hero+FactCard, packages ancrés
  #offers/#offres, mécanisme 3 étapes, preuves, 4 audiences, FAQ, CtaBand) en TDD strict —
  EARS-9/18..23 rouges puis verts ; npm test 27/27, check et build verts, 3 commits.
---

# Run implement-5 — Tâche 05 « Home complète EN + FR »

## Ce qui a été fait

1. **RED** — suite « CAP-4 home » ajoutée à `tests/pages.test.ts` avec les assertions exactes de la
   tâche (EARS-9, 18, 19, 20, 21, 22, 23) + helper `lirePage()` ; vérifiée rouge (6 échecs / 6
   anciens verts) et committée (`3a8cb11`).
2. **GREEN — contenu** (`e478c3d`) : `src/content/site.ts` étendu symétriquement EN/FR —
   `home.heroFacts` (5 lignes k/v de la carte de faits E3, une seule valeur cuivre) et
   `home.mechanism.stepTitles` (Sprint → Frozen scope/Périmètre gelé → Firm price/Prix ferme).
3. **GREEN — pages** (`e8ca59d`) : `src/pages/index.astro` et `src/pages/fr/index.astro` composent
   les 7 sections dans l'ordre validé avec `data-section`, OfferCard ×3 (01/02/03 → pages
   package), FactCard dans le hero (grid 1.5fr/1fr, gap 48, 1 col < 900px), mécanisme numéroté +
   punchline, preuve CAC40 « 80,000 users » → `/founder/`, 4 `data-audience`, FAQ 5×
   `data-faq-item`, wrapper `data-section="cta-band"` autour de CtaBand ; ancres `id="offers"` /
   `id="offres"`.

## Vérification

- `npm test` : 27/27 verts (5 fichiers, dont les 12 de pages.test.ts).
- `npm run check` : 0 erreur, 0 warning. `npm run build` : 2 pages, OK.
- Conformité E3 préservée : aucun hex hors tokens, transition `.aud` sous garde
  `prefers-reduced-motion` (EARS-51/52 verts).

## Hypothèses retenues

- Le contenu de la FactCard hero et les titres d'étapes du mécanisme n'existaient pas dans
  `site.ts` (tâche 03) : ajoutés en extension additive symétrique, conformément au principe du
  plan « tout le texte vit dans site.ts » (parité i18n vérifiée verte). Contenu FactCard repris du
  design retenu `design/ds/sections/hero-split.html`, pair FR idiomatique.
- Le CTA primaire du hero (« Book a call » / « Prendre un call ») pointe désormais vers la page
  contact de la locale avec `data-cta="contact"` (au lieu du mailto du scaffold), pour respecter
  EARS-8 « tout CTA contact mène à la page contact ».
- Clés techniques `data-audience` (`startup`, `smb`, `enterprise`, `us`) définies dans les pages,
  pas dans `site.ts` : identifiants de testabilité invariants par locale, pas du contenu.
- `/contact/`, `/sprint/`, etc. sont encore des liens vers des pages non buildées : elles arrivent
  aux tâches 06/07 ; les tests EARS ne parcourent que les pages existantes de `dist/`.
