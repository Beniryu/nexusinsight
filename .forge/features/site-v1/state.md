---
feature: site-v1 # [a-z0-9-], jamais suffixe -test/-prod, == nom du dossier
titre: "Site vitrine NexusInsight v1 (EN/FR)"
repo_slug: nexusinsight # == projet.slug de .forge/config.yml
route: full # quick | full  (state.md n'existe que pour `full`)
branche: forge/site-v1
worktree: .worktrees/forge/site-v1
base_sha: d9855b66d184c6370fc5c4f3d6ee5a312d3574a8 # sha de main au moment du /forge:new
statut: in_progress # draft | in_progress | awaiting_promotion | promoted | failed | abandoned
etape_courante: review
failure_reason: null # null | step_failed_3x | timeout | external_budget | aborted_by_user | artefact_invalide
cree_le: 2026-08-12T02:51:48+02:00
mis_a_jour_le: 2026-08-12T04:09:05+02:00
etapes:
  # statuts : pending | running | passed | failed | skipped
  pitch: { statut: passed }
  spec: { statut: passed, valide_par: kaan }
  plan: { statut: passed, valide_par: kaan }
  implement: { statut: passed, tentatives: 0, task_courante: "08" }
  review: { statut: running, tentatives: 0, cycles: 0, verdict: null }
  fix: { statut: pending, tentatives: 0 }
  verify: { statut: pending, tentatives: 0 }
  test_fix: { statut: pending, tentatives: 0 }
  deploy_test: { statut: pending, tentatives: 0, cibles: [] } # cibles : [{type, artefact, acces_test, run_id}]
  report: { statut: pending }
  archive: { statut: pending }
caps:
  tentatives_max: 3 # depasse => etape failed + statut failed (failure_reason: step_failed_3x)
  max_heures_total: 24
budget_externe:
  # coûts FACTURABLES hors abonnement Claude UNIQUEMENT
  plafond_usd: 10
  ressources: [] # [{type, nom, cout_usd_mois, cree_par_forge}]
  risque_signale_avant_go: false # true = le depassement potentiel a ete montre a Kaan AVANT le go
tokens_usd_info: 49.3212 # informatif, JAMAIS un garde-fou (aucun arret sur ce champ)
promotion:
  commande: "forge promote site-v1"
  executee_le: null
---
## Journal
- 2026-08-12T02:51:48+02:00 — creation de la feature (route full, branche forge/site-v1)
- 2026-08-12T02:55:41+02:00 — pitch passed (appetite 2 jours, plafond externe 10 USD)
- 2026-08-12T03:06:30+02:00 — spec passed (GATE 1, validee par kaan)
- 2026-08-12T03:06:30+02:00 — caps.max_heures_total 8 -> 24 (demande de Kaan, config.yml aligne)
- 2026-08-12T03:13:20+02:00 — plan passed (GATE 2, validee par kaan, baseline verte)
- 2026-08-12T03:18:52+02:00 — implement/tache 01 passed (run 1) — Tâche 01 verte en TDD strict : tests/fonts.test.ts écrit rouge puis vert (7/7 dont EARS-1..5), 6 woff2 committés dans public/fonts/ + LICENSES.md (FFL ITF + OFL complètes), fonts.css (font-display: swap, src locales) importé dans Layout.astro ; check et build verts, NG-2 vérifié.
- 2026-08-12T03:25:20+02:00 — implement/tache 02 passed (run 2) — Tâche 02 verte en TDD strict : parité des routes (EARS-48) dans tests/i18n.test.ts et hreflang/canonical/favicon sur HTML buildé (EARS-43/47) dans tests/pages.test.ts, rouges puis verts ; routes.ts créé, Layout dérivé de paire(path) (noindex, og:image absolu, favicon), favicon.svg + og-en/fr.png 1200×630 committés. 10/10 tests, check et build verts, NG-1..4 OK.
- 2026-08-12T03:36:16+02:00 — implement/tache 03 passed (run 3) — site.ts étendu à tout le contenu bilingue (nav, footer, home 7 sections, sprint/build/delivery, method, founder, contact, legal, 404) ; tests/content.test.ts créé et i18n.test.ts étendu (EARS-12), TDD rouge→vert : 15 tests verts, astro check 0 erreur.
- 2026-08-12T03:43:46+02:00 — implement/tache 04 passed (run 4) — Kit E3 partagé créé (Nav, Footer, CtaBand, OfferCard, FactCard — tokens uniquement, zéro hex), Nav/Footer intégrés au Layout ; TDD rouge→vert : EARS-6/7/8/10 sur le HTML buildé + EARS-51/52 dans tests/design.test.ts. 21 tests verts, astro check 0 erreur, build OK.
- 2026-08-12T03:51:25+02:00 — implement/tache 05 passed (run 5) — Homes EN/FR complètes (7 sections du wireframe : hero+FactCard, packages ancrés #offers/#offres, mécanisme 3 étapes, preuves, 4 audiences, FAQ, CtaBand) en TDD strict — EARS-9/18..23 rouges puis verts ; npm test 27/27, check et build verts, 3 commits.
- 2026-08-12T03:57:57+02:00 — implement/tache 06 passed (run 6) — Tâche 06 en TDD strict : 7 tests EARS-24..30 écrits dans tests/pages.test.ts (rouges vérifiés, commit ac241cc), puis gabarit PackagePage.astro + 6 pages /sprint /build /delivery et paires FR (commit 1387273). npm test 34/34, npm run check 0 erreur, build 8 pages — 6 routes servies.
- 2026-08-12T04:04:35+02:00 — implement/tache 07 passed (run 7) — Tâche 07 en TDD strict : 6 tests EARS-31..36,38..42,49,50 écrits dans tests/pages.test.ts (rouges vérifiés, commit e23e67b), puis 4 gabarits + 8 pages EN/FR + 404 E3 (commit 35d84f5). npm test 40/40, npm run check 0 erreur, build 17 pages, Dockerfile/nginx.conf intouchés.
- 2026-08-12T04:09:05+02:00 — implement/tache 08 passed (run 8) — Harnais transverse finalisé sur dist/ : suite CAP-10 ajoutée à tests/pages.test.ts (EARS-44 sitemap = exactement 14 URLs indexables sans légales, EARS-45 OG complet + og:image locale absolue, EARS-46 robots.txt, EARS-4 zéro hôte externe) ; public/robots.txt créé. npm test 44/44 vert, npm run check 0 erreur, build 17 pages, les 4 no-gos sortent en 0.
- 2026-08-12T04:09:05+02:00 — implement passed (run 1) — 8 tache(s) implementee(s)
