---
statut: passed
resume: >-
  Les 3 findings de review-1 sont corrigés, un commit chacun. Majeure EARS-2 (617eb17) :
  JetBrains Mono Regular+Medium subsettés en latin via pyftsubset (~32 Ko et 361 codepoints
  chacun contre ~92 Ko/1 363, zéro cyrillique/grec), plafond 40 Ko ajouté à fonts.test.ts
  (ROUGE vérifié sur les fichiers complets), LICENSES.md documente la modification OFL.
  Mineures : CAP-4 paramétré sur les deux homes EN+FR (786ae4d, mutation FR vérifiée ROUGE)
  et EARS-24 asserte data-section="timeline" (d590c7f). Suite complète 45/45 verte,
  npm run check 0 erreur.
---

# Run fix-1 — Corrections de la revue adversariale (review-1)

## Finding majeur — EARS-2, subset latin JetBrains Mono (commit `617eb17`)

- **TDD** : test « EARS-2 : chaque woff2 est un subset latin — plafond 40 Ko » ajouté à
  `tests/fonts.test.ts` (`statSync` ≤ 40 × 1024 octets par fichier), vérifié ROUGE sur les
  fichiers complets (92 164 et 93 824 octets).
- **Subset** : `pyftsubset --flavor=woff2` (fontTools 4.63.0 + brotli) avec
  `U+0000-00FF, U+0100-017F, U+2000-206F, U+20AC, U+2190-2199` — les ranges suggérés par la
  revue, plus les flèches car un scan de `src/` montre que les seuls codepoints > U+00FF
  utilisés sont — ’ “ ” … € → ↔. Résultat : 32 140 / 32 820 octets, 587 glyphes,
  361 codepoints par graisse (aligné sur Clash Display 380 et Switzer 385), 0 cyrillique,
  0 grec ; présence vérifiée de — ’ € → ↔ é œ via fontTools.
- **LICENSES.md** : la mention « webfonts officiels, non modifiés » devenait fausse — la
  ligne JetBrains Mono documente désormais le subsetting et ses unicode-ranges (OFL).

## Finding mineur — couverture home FR EARS-18..23 (commit `786ae4d`)

- Le bloc CAP-4 de `tests/pages.test.ts` itère sur `index.html` **et** `fr/index.html` :
  ordre des 7 sections, cards indexées, liens packages localisés via `paire()`, étapes et
  punchline du mécanisme tirées de `site[locale]` (helper d'échappement des nœuds texte
  Astro : `'` → `&#39;`, etc.), chiffre autorisé par locale (« 80,000 users » /
  « 80 000 utilisateurs »), lien founder par locale, comptages audiences (4) et FAQ (4-5).
- **Vérifié par mutation** : renommer `data-section="proof"` dans `fr/index.astro` fait
  échouer EARS-18/19 — le scénario d'échec décrit par la revue est désormais détecté.

## Finding mineur — EARS-24 asserte la section timeline (commit `d590c7f`)

- `'timeline'` ajouté à la liste des sections vérifiées sur les 6 pages package, à sa place
  dans l'ordre du contrat de testabilité de `PackagePage.astro`
  (hero | deliverables | timeline | exclusions | prerequisites | faq | crosslink).

## Vérification finale

- `npx vitest run` : **45/45 verts** (44 + le nouveau test de taille EARS-2), dist rebuildé.
- `npm run check` : 0 erreur, 0 warning, 0 hint.
- Périmètre respecté : seuls `public/fonts/` (2 woff2 + LICENSES.md), `tests/fonts.test.ts`
  et `tests/pages.test.ts` sont modifiés — aucun composant ni contenu touché.
