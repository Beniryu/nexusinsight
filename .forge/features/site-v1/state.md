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
mis_a_jour_le: 2026-08-12T03:13:59+02:00
etapes:
  # statuts : pending | running | passed | failed | skipped
  pitch: { statut: passed }
  spec: { statut: passed, valide_par: kaan }
  plan: { statut: passed, valide_par: kaan }
  implement: { statut: running, tentatives: 0, task_courante: null }
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
tokens_usd_info: 0 # informatif, JAMAIS un garde-fou (aucun arret sur ce champ)
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
