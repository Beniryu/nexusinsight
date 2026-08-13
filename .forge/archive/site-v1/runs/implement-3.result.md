---
statut: passed
resume: >-
  site.ts étendu à tout le contenu bilingue (nav, footer, home 7 sections, sprint/build/delivery,
  method, founder, contact, legal, 404) ; tests/content.test.ts créé et i18n.test.ts étendu (EARS-12),
  TDD rouge→vert : 15 tests verts, astro check 0 erreur.
---

# Run implement-3 — tâche 03 (modèle de contenu bilingue + conformité copy)

## Ce qui a été fait

- **RED** : `tests/content.test.ts` créé par extraction octet-à-octet du bloc « Test d'abord » de la tâche (EARS-13 prix, EARS-14 HT/excl. VAT, EARS-15 emoji, EARS-16 vocabulaire interdit) ; test EARS-12 (meta.title/description EN≠FR par page) ajouté à `tests/i18n.test.ts`. Rouge confirmé : 3 échecs (12/13/14 — 15/16 sont des tests d'absence, verts par nature avant extension). Commit `ea8cd3c`.
- **GREEN** : `src/content/site.ts` étendu — interface `Copy` complète (`nav`, `footer`, `home {packagesTitle, packages[3], mechanism, proof, audiences[4], faq[5], ctaBand}`, `pages {sprint, build, delivery, method, founder, contact, legal, notFound}`), EN et FR en pairs idiomatiques. Commit `294bc82`.
- Vérification : `npm test` → 15/15 verts (parité des clés EARS-11 incluse, mécaniquement via i18n.test.ts) ; `npm run check` → 0 erreur.

## Hypothèses retenues (headless)

- Montants repris octet-à-octet d'`OFFERS.md` (espaces ASCII : « 9 500 € », « 25 000 € », « 3 900 € », « 7 500 € ») — les regex de la tâche acceptent U+202F ou espace ASCII, l'identité stricte à la source a été préférée.
- « audité / s'audite » (OFFERS.md §2) réécrit en « évalué / s'évalue » — substitution prescrite par OFFERS.md §Notes (« jamais "audit", la reprise d'existant "s'évalue" ») et EARS-16.
- `footer.founderSite` : EN « Founder's personal site » (libellé EARS-10), FR « Site personnel du fondateur » (pair idiomatique, EARS-6 faisant de même pour la nav).
- Porte d'entrée de l'audience « US / international » : Sprint (le mécanisme commence par le petit package ; BRAND §3 dit « les 3 packages »).
- `crossLink` du Delivery → Sprint (EARS-30 n'impose que Sprint→Build et Build→Delivery ; le champ existe sur les 3 pages pour un gabarit uniforme).
- 404 : les liens `/` et `/fr/` vivent dans les deux locales (page unique `dist/404.html`, EARS-50).

## EARS-17 (test: manual) — pour la revue humaine

Copy écrite en « nous » (jamais « je »), phrases déclaratives, sentence case, aucun point final aux titres, zéro emoji, registre pro sobre. À relire au rapport avant promotion prod.
