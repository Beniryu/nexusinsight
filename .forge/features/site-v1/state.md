---
feature: site-v1 # [a-z0-9-], jamais suffixe -test/-prod, == nom du dossier
titre: "Site vitrine NexusInsight v1 (EN/FR)"
repo_slug: nexusinsight # == projet.slug de .forge/config.yml
route: full # quick | full  (state.md n'existe que pour `full`)
branche: forge/site-v1
worktree: .worktrees/forge/site-v1
base_sha: d9855b66d184c6370fc5c4f3d6ee5a312d3574a8 # sha de main au moment du /forge:new
statut: in_progress # draft | in_progress | awaiting_promotion | promoted | failed | abandoned
etape_courante: report
failure_reason: null # null | step_failed_3x | timeout | external_budget | aborted_by_user | artefact_invalide
cree_le: 2026-08-12T02:51:48+02:00
mis_a_jour_le: 2026-08-12T04:31:29+02:00
etapes:
  # statuts : pending | running | passed | failed | skipped
  pitch: { statut: passed }
  spec: { statut: passed, valide_par: kaan }
  plan: { statut: passed, valide_par: kaan }
  implement: { statut: passed, tentatives: 0, task_courante: "08" }
  review: { statut: passed, tentatives: 0, cycles: 1, verdict: approuve }
  fix: { statut: passed, tentatives: 0 }
  verify: { statut: passed, tentatives: 0 }
  test_fix: { statut: pending, tentatives: 0 }
  deploy_test: { statut: passed, tentatives: 0, cibles: [ { type: cloud-run, artefact: europe-west1-docker.pkg.dev/kaan-personal-system/forge/nexusinsight@sha256:c4685f21745f0cb9a9d8c4a74c04b3565204c90a1544257f6cb9f846f25dee97, acces_test: https://nexusinsight-test-d6kia6goga-ew.a.run.app, run_id: "31556917649" } ] } # cibles : [{type, artefact, acces_test, run_id}]
  report: { statut: passed, tentatives: 0 }
  archive: { statut: pending }
caps:
  tentatives_max: 3 # depasse => etape failed + statut failed (failure_reason: step_failed_3x)
  max_heures_total: 24
budget_externe:
  # coûts FACTURABLES hors abonnement Claude UNIQUEMENT
  plafond_usd: 10
  ressources: [] # [{type, nom, cout_usd_mois, cree_par_forge}]
  risque_signale_avant_go: false # true = le depassement potentiel a ete montre a Kaan AVANT le go
tokens_usd_info: 68.2879 # informatif, JAMAIS un garde-fou (aucun arret sur ce champ)
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
- 2026-08-12T04:16:20+02:00 — review passed (run 1) — Relecture adversariale complète : spec + plan relus, diff intégral parcouru (composants, pages, contenu, tests), suite rejouée réellement (44/44 verts, dist rebuildé), npm run check 0 erreur, no-gos vérifiés (package.json/Dockerfile/nginx.conf intouchés, aucun hôte externe, statique pur), fond strictement conforme à brand/OFFERS.md et brand/BRAND.md (prix EUR/USD + HT, chiffre CAC40 autorisé seul, vocabulaire interdit absent, Rémunet cité en réalisation du fondateur), SEO bilingue conforme (canonical/hreflang/x-default, sitemap 14 URLs exact, noindex légales seules, OG absolu local, robots, favicon), fontes authentiques aux bons poids et familles alignées avec tokens.css. Un écart objectif confirmé bloque l'approbation : JetBrains Mono committé en fichiers complets (cyrillique+grec) au lieu du subset latin exigé par EARS-2, invisible pour fonts.test.ts — plus deux trous de couverture mineurs (home FR et section déroulé non assertées). Hypothèses acceptées : 404 bilingue hors registre sans nav/footer (liens de reprise EARS-50 présents, choix documenté) ; modification .forge/config.yml (budget orchestrateur, hors périmètre de la spec).
- 2026-08-12T04:23:10+02:00 — fix passed (run 1) — Les 3 findings de review-1 sont corrigés, un commit chacun. Majeure EARS-2 (617eb17) : JetBrains Mono Regular+Medium subsettés en latin via pyftsubset (~32 Ko et 361 codepoints chacun contre ~92 Ko/1 363, zéro cyrillique/grec), plafond 40 Ko ajouté à fonts.test.ts (ROUGE vérifié sur les fichiers complets), LICENSES.md documente la modification OFL. Mineures : CAP-4 paramétré sur les deux homes EN+FR (786ae4d, mutation FR vérifiée ROUGE) et EARS-24 asserte data-section="timeline" (d590c7f). Suite complète 45/45 verte, npm run check 0 erreur.
- 2026-08-12T04:27:09+02:00 — review passed (run 2) — Revue adversariale de contrôle après fix-1 : les 3 findings de review-1 sont réellement corrigés et vérifiés par exécution indépendante. Majeure EARS-2 : les deux woff2 JetBrains Mono sont d'authentiques subsets latin (361 codepoints chacun, 0 cyrillique, 0 grec, 32 140 / 32 820 octets contre ~92 Ko — contre-vérifié via fontTools, glyphes critiques — ' € → ↔ é œ présents) et fonts.test.ts plafonne désormais chaque fichier à 40 Ko (les fichiers complets d'origine échoueraient). Mineure 1 : le bloc CAP-4 de pages.test.ts itère sur les deux homes EN et FR — ordre des 7 sections par positions, cards indexées, liens packages localisés via paire(), étapes/punchline tirées de site[locale], chiffre autorisé par locale, audiences et FAQ comptées. Mineure 2 : EARS-24 asserte data-section="timeline" sur les 6 pages package. Re-vérification globale rejouée : vitest 45/45 verts (build réel de dist/), npm run check 0 erreur / 0 warning / 0 hint, no-gos intacts (diff vide sur package.json, Dockerfile, nginx.conf ; aucun hôte externe dans le HTML buildé), familles fonts.css alignées sur tokens.css, prix EUR/USD exacts d'OFFERS.md et chaque prix affiché accompagné de HT / excl. VAT dans le HTML buildé (3 cards home + hero de chaque package, EN et FR), vocabulaire interdit absent, aucune promesse chiffrée de résultat client, Rémunet cité en réalisation personnelle du fondateur dans les deux locales, nav Offers en ancre absolue /#offers - /fr/#offres, canonical/hreflang/x-default/noindex dérivés du registre, sitemap 14 URLs exactes, OG PNG committés, delivery FR contre-vérifiée (2 tiers, 30 jours, 3 900/7 500 €). Hypothèses de review-1 maintenues : 404 bilingue hors registre sans nav/footer (liens de reprise présents), modification .forge/config.yml limitée au budget orchestrateur (max_heures_total 8→24, hors périmètre spec). Critères [test: manual] (EARS-17, 37, 53, 54, 55) restent pour la revue humaine avant promotion prod, conformément au plan.
- 2026-08-12T04:27:18+02:00 — verify passed (run 1) — suite verte (lint/typecheck/test + no-gos)
- 2026-08-12T04:27:18+02:00 — deploy_test : 1 fichier(s) non committe(s) par les agents inclus dans le commit de declenchement (.remember/)
- 2026-08-12T04:27:20+02:00 — deploy_test : forge/site-v1 pousse en ff2ba81a18fe — attente du run forge-deploy-test.yml
- 2026-08-12T04:27:21+02:00 — deploy_test : run introuvable (tour 1, 0 run(s) listes) — nouvelle tentative dans 5 s
- 2026-08-12T04:27:27+02:00 — deploy_test : run introuvable (tour 2, 0 run(s) listes) — nouvelle tentative dans 10 s
- 2026-08-12T04:27:37+02:00 — deploy_test : run 31556917649 demarre — suivi jusqu'a sa conclusion
- 2026-08-12T04:29:19+02:00 — deploy_test : https://nexusinsight-test-d6kia6goga-ew.a.run.app — europe-west1-docker.pkg.dev/kaan-personal-system/forge/nexusinsight@sha256:c4685f21745f0cb9a9d8c4a74c04b3565204c90a1544257f6cb9f846f25dee97
- 2026-08-12T04:29:19+02:00 — deploy_test passed (run 1) — 1 cible(s) deployee(s) en test
- 2026-08-12T04:31:29+02:00 — report passed (run 1) — report.md assemblé et validé (validate-artifacts ✅) : ready_for_promotion, 45/45 tests, 50/55 EARS auto verts + 5 manuels listés, 4 no-gos pass, diff 75 fichiers +4611/-34, coûts externes 0 USD, cible Cloud Run test + commande gh workflow tracées, promotion via `forge promote site-v1`.
