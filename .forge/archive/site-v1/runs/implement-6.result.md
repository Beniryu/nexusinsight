---
statut: passed
resume: >-
  Tâche 06 en TDD strict : 7 tests EARS-24..30 écrits dans tests/pages.test.ts (rouges vérifiés,
  commit ac241cc), puis gabarit PackagePage.astro + 6 pages /sprint /build /delivery et paires FR
  (commit 1387273). npm test 34/34, npm run check 0 erreur, build 8 pages — 6 routes servies.
---

# Run implement-6 — Pages packages ×6 via gabarit commun

## Ce qui a été fait

- **Tests d'abord (rouge)** : suite « CAP-5 — pages packages ×6 » ajoutée à `tests/pages.test.ts`
  avec le code exact du fichier de tâche (EARS-24..30). Rouge vérifié : 7 failed / 12 passed
  (ENOENT sur `dist/sprint/index.html`). Commit `ac241cc`.
- **Implémentation (vert)** :
  - `src/components/PackagePage.astro` — gabarit commun, props `{locale, path, page}`, sections
    `data-section="hero|deliverables|timeline|exclusions|prerequisites|faq|crosslink"`,
    `data-deliverable` (livrables numérotés), `data-tier` (2 intensités Delivery),
    `data-exclusion`, FAQ en `data-faq-item`, cross-link + `CtaBand` (CTA contact). Styles 100 %
    tokens (`--nxi-*`), aucun hex, aucune transition (EARS-51/52 restent verts).
  - `src/pages/{sprint,build,delivery}.astro` + `src/pages/fr/{sprint,build,delivery}.astro` —
    6 pages fines (~7 lignes) : gabarit + `site[locale].pages.<pkg>` + `path` du registre.
  - `src/content/site.ts` — export des types `SprintPage/BuildPage/DeliveryPage` + union
    `PackageContent` ; ajout `prerequisitesTitle`/`prerequisites` à `DeliveryPage` (EN/FR).
  - Commit `1387273`.

## Vérifications (DoD)

- `npm test` : 34/34 verts (dont EARS-24..30 sur le HTML buildé).
- `npm run check` : 0 erreur, 0 warning (23 fichiers).
- `npm run build` : 8 pages, les 6 routes package servies, symétriques EN/FR.

## Hypothèse retenue

- EARS-24 exige `data-section="prerequisites"` sur les 6 pages, mais `brand/OFFERS.md` §3 n'a pas
  de bloc « prérequis client » pour Delivery. Décision : la section reprend le « Pour qui » du
  package (une équipe de dev existante — interne, ESN ou offshore ; un seul produit par
  abonnement), sans réécrire le fond. Titres alignés sur Build (« Where it starts from » /
  « Le point de départ »).
