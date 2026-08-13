---
statut: passed
resume: "report.md assemblé et validé (validate-artifacts ✅) : ready_for_promotion, 45/45 tests, 50/55 EARS auto verts + 5 manuels listés, 4 no-gos pass, diff 75 fichiers +4611/-34, coûts externes 0 USD, cible Cloud Run test + commande gh workflow tracées, promotion via `forge promote site-v1`."
---

# report-1 — site-v1

`report.md` écrit depuis les artefacts commités, sans chiffre inventé :
- tests 45/45 et no-gos NG-1..4 pass : `runs/verify-1.log`
- critères EARS : comptés dans `spec.md` (55 dont 5 `[test: manual]` : EARS-17, 37, 53, 54, 55)
- revue adversariale : `runs/review-1.result.md` (changements_demandes, 1 majeure + 2 mineures),
  `runs/fix-1.result.md`, `runs/review-2.result.md` (approuve, 0 finding)
- cible test, digest et run_id : `runs/deploy-report.json` / `state.md → etapes.deploy_test.cibles`
- base_sha/head_sha, diff --stat, commandes de promotion : faits mécaniques de l'orchestrateur
- coûts externes : `state.md → budget_externe.ressources` = [] → `couts_externes_usd: 0`

Hypothèse retenue : `tests.criteres_ears.pass = 50` = tous les critères `[test: auto]` de la
spec, couverts par la suite verte et contre-vérifiés par review-2 (aucun finding ouvert).
Validation : `scripts/validate-artifacts.sh` → report.md ✅, 0 erreur sur la feature.
