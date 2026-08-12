---
feature: site-v1 # [a-z0-9-], jamais suffixe -test/-prod, == nom du dossier
titre: "Site vitrine NexusInsight v1 (EN/FR)"
repo_slug: nexusinsight # == projet.slug de .forge/config.yml
route: full # quick | full  (state.md n'existe que pour `full`)
branche: forge/site-v1
worktree: .worktrees/forge/site-v1
base_sha: d9855b66d184c6370fc5c4f3d6ee5a312d3574a8 # sha de main au moment du /forge:new
statut: in_progress # draft | in_progress | awaiting_promotion | promoted | failed | abandoned
etape_courante: implement
failure_reason: null # null | step_failed_3x | timeout | external_budget | aborted_by_user | artefact_invalide
cree_le: 2026-08-12T02:51:48+02:00
mis_a_jour_le: 2026-08-12T03:25:20+02:00
etapes:
  # statuts : pending | running | passed | failed | skipped
  pitch: { statut: passed }
  spec: { statut: passed, valide_par: kaan }
  plan: { statut: passed, valide_par: kaan }
  implement: { statut: running, tentatives: 0, task_courante: "02" }
  review: { statut: pending, tentatives: 0, cycles: 0, verdict: null }
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
tokens_usd_info: 11.0392 # informatif, JAMAIS un garde-fou (aucun arret sur ce champ)
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
